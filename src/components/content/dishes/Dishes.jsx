import { useEffect, useRef, useState } from "react";
import "./dish.css";

import { useBasket, useDispatch } from "../../contextBasket";


function NavPaginator({ paginationLenght, page, handlePageNumber, sectionRef }) {

    const paginatorRef = useRef(null);
    const selectedPageRef = useRef(null);


    useEffect(() => {
        selectedPageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
    }, [page]);

    useEffect(() => {

        let container = paginatorRef.current
        let timer = null;

        const handleWheel = (event) => {
            event.preventDefault();
            const width = container.firstElementChild.getBoundingClientRect().width;
            if (timer) {
                return;
            }

            container.scrollLeft += Math.sign(event.deltaY) * (width + 19.5)

            timer = setTimeout(() => { timer = null }, 100);
        }

        container.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            container.removeEventListener("wheel", handleWheel)
            clearTimeout(timer)
        }
    }, [])

    return <ul ref={paginatorRef} className="pagination-container">
        {Array.from({ length: paginationLenght }, (_, i) => i + 1).map((a, i) =>
            <li key={i} className={page === i + 1 ? "selected" : ""}
                ref={page === i + 1 ? selectedPageRef : null}
                onClick={
                    e => {
                        console.log("page: ", page)
                        console.log(i)
                        handlePageNumber(a);

                        sectionRef.current.scrollIntoView({ top: "10px", behavior: 'smooth' });
                    }}>{a}</li>)}
    </ul>

}

export function Dishes({ dishes, page, handlePageNumber }) {

    const length = dishes.length;
    const dishesPerPage = 10;
    const sectionRef = useRef(null);
    const paginationLenght = length > 10 ? length / dishesPerPage : length;
    const currentStart = length > 10 ? dishesPerPage * page - 1 + (page > 1 ? 1 : 0) : 0;
    let dishRange = dishes.slice(currentStart, currentStart + 10);

    console.log("dish range: ", dishRange)

    return <>
        <div className="main-container">
            <section ref={sectionRef} className="dishes">

                {
                    dishRange.map(dish => <article key={dish.strId}><Dish infos={{ ...dish }} /></article>)
                }
            </section>

            <NavPaginator
                paginationLenght={paginationLenght}
                page={page}
                handlePageNumber={handlePageNumber}
                sectionRef={sectionRef}></NavPaginator>

        </div>
    </>
}

export function Dish({ infos }) {

    return <div className="dish-card" style={{ "--bg-image-meal": `url(${infos.strMealThumb})` }}>

        <div className="dish-img">
            <AddDish infos={infos} />
        </div>
        <div className="dish-description">
            <div className="dish-info">
                <div className="dish-name">{infos.strMeal}</div>
                <div className="dish-rating">5 stars</div>
            </div>
            <div className="dish-description-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet architecto aspernatur aperiam vero nihil </div>
            <div className="dish-price">15$</div>
        </div>
    </div>
}

export function AddDish({ infos }) {

    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    return (value !== 0 && <div className="qty-container">
        <span className="rem" onClick={e => {
            setValue(value => value - 1 <= 0 ? 0 : value - 1)
            dispatch({ type: (value > 1) ? 'REMOVE_DUPLICATE_BASKET' : 'REMOVE_FROM_BASKET', payload: { id: infos.idMeal, name: infos.strMeal, quantity: value - 1, price: 15, img: infos.strMealThumb} })
        }}>-</span>

        <span>{value === 0 ? "" : value}</span>

        <span className="add" onClick={e => {
            setValue(value => value + 1 >= 10 ? 10 : value + 1);
            dispatch({ type: 'DUPLICATE_BASKET', payload: { id: infos.idMeal, name: infos.strMeal, quantity: value + 1, price: 15, img: infos.strMealThumb} });
        }}
            onSelect={e => { e.preventDefault() }}>+</span>
    </div> || <button className="btn-add" onClick={(e) => {
        setValue(value => value + 1);
        dispatch({ type: 'ADD_TO_BASKET', payload: { id: infos.idMeal, name: infos.strMeal, quantity: value + 1, price: 15, img: infos.strMealThumb} });
    }}><span>+</span></button>)


}