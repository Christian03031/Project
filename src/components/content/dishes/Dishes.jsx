import { useRef, useState } from "react";
import "./dish.css";

import { useBasket, useDispatch } from "../../contextBasket";


export function Dishes({ dishes, page, handlePageNumber}) {

    
    const sectionRef = useRef(null);
    console.log(page);

    const length = dishes.length;
    const dishesPerPage = 10;
    const paginationLenght = length / dishesPerPage;

    const currentStart = dishesPerPage * page - 1 + (page > 1 ? 1 : 0);
    let dishRange = dishes.slice(currentStart, currentStart + dishesPerPage)

    console.log(page);


    return <>
        <div className="main-container">
            <section ref={sectionRef} className="dishes">
                {
                    dishRange.map(dish => <article key={dish.strId}><Dish infos={{ ...dish }} /></article>)
                }


            </section>
            <ul className="pagination-container">
                {Array.from({ length: paginationLenght }, (_, i) => i + 1).map((a, i) =>
                    <li key={i} className = {page === i + 1? "selected" : ""} onClick={
                        e => {
                            console.log("page: ", page)
                            console.log(i)
                            handlePageNumber(a);

                            sectionRef.current.scrollIntoView({ top: "10px", behavior: 'smooth' });
                        }}>{a}</li>)}
            </ul>
        </div>


    </>



}

export function Dish({ infos }) {

    return <div className="dish-card" style={{ "--bg-image-meal": `url(${infos.strMealThumb})` }}>

        <div className="dish-img">
            <AddDish id={infos.idMeal} />
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

export function AddDish({ id }) {

    const dispatch = useDispatch();
    const basket = useBasket();

    const [value, setValue] = useState(0);

    return (value !== 0 && <div className="qty-container">
        <span className="rem" onClick={e => {
            setValue(value => value - 1 <= 0 ? 0 : value - 1)
            dispatch({ type: (value > 1) ? 'REMOVE_DUPLICATE_BASKET' : 'REMOVE_FROM_BASKET', payload: { id: id, quantity: value - 1 } })
        }}>-</span>

        <span>{value === 0 ? "" : value}</span>

        <span className="add" onClick={e => {
            setValue(value => value + 1 >= 10 ? 10 : value + 1);
            dispatch({ type: 'DUPLICATE_BASKET', payload: { id: id, quantity: value + 1 } });
            console.log(basket);
        }}
            onSelect={e => { e.preventDefault() }}>+</span>
    </div> || <button className="btn-add" onClick={(e) => {
        setValue(value => value + 1);
        dispatch({ type: 'ADD_TO_BASKET', payload: { id: id, quantity: value + 1 } });
        console.log(basket);
    }}><span>+</span></button>)


}