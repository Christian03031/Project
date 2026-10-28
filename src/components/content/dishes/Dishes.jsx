import { useEffect, useId, useRef, useState } from "react";
import { useBasket, useDispatch } from "../../../context/contextBasket";
import "./dish.css";
import Rating from "../../items/rating/Rating";

function NavPaginator({ paginationLenght, page, handlePageNumber, sectionRef, maxPagesPerView = 3 }) {

    const paginatorRef = useRef(null);
    const selectedPageRef = useRef(null);
    const [view, setView] = useState(0);


    console.log(paginationLenght)
    console.log(page)


    useEffect(() => {
        setView(0);
    }, [paginationLenght])

    useEffect(() => {
        selectedPageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
    }, []);

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
        {view > 0 &&
            <li
                onClick={e => { setView(a => a - maxPagesPerView) }}>&lt;
            </li>
        }
        {Array.from({ length: paginationLenght }, (_, i) => i + 1).slice(view, view + maxPagesPerView).map((a, i) =>
            <li key={i} className={page === a ? "selected" : ""}
                ref={page === a ? selectedPageRef : null}
                onClick={
                    e => {
                        handlePageNumber(a);
                        sectionRef.current.scrollIntoView({ top: "10px", behavior: 'smooth' });
                    }}>{a}</li>)}
        {paginationLenght > maxPagesPerView && view < paginationLenght / maxPagesPerView &&
            <li
                onClick={e => { setView(a => a + maxPagesPerView) }}>&gt;</li>}


    </ul>

}

export function Dishes({ dishes, page, handlePageNumber, meal, loading }) {

    const [modal, setModal] = useState({ state: false, infos: {} });
    const [dishesPerPage, setDishesPerPage] = useState(10);

    const length = dishes.length;

    console.log("length: ", dishes.length)
    
    const sectionRef = useRef(null);
    const paginationLenght = length > dishesPerPage ? length / dishesPerPage : 1;
    const currentStart = length > dishesPerPage ? dishesPerPage * (page - 1) : 0;
    let dishRange = dishes.slice(currentStart, (currentStart + dishesPerPage) > length ? length - 1 : (currentStart + dishesPerPage));
    console.log("----------------------------")
    console.log("dishrange: ", dishRange)
    console.log("length: ", length)
    console.log("dishperpage: ", dishesPerPage)
    console.log("currentStart: ", currentStart)
    console.log("page: ", page)



    useEffect(() => {
        const card = sectionRef.current?.querySelector(".dish-card");
        const current = sectionRef?.current;
        if (card && current) {
            const width = card.getBoundingClientRect().width;
            const currentWidth = current.getBoundingClientRect().width;

            setDishesPerPage(Math.pow(Math.trunc(currentWidth / width), 2));
        }
    }, [dishes, loading]);


    return <>
        <div className="main-container">

            {modal.state === true && <Modal infos={{ ...modal.infos }} setModal={setModal} meal={meal} />}
            <section key={useId()} ref={sectionRef} className="dishes">
                {loading && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => <DishSkeleton key={a} />)}
                {!loading && dishRange.map((dish) => <article key={dish.strId}><Dish key={dish.strId} infos={{ ...dish }} setModal={setModal} /></article>)}
            </section>

            {paginationLenght > 1 &&
                <NavPaginator
                    paginationLenght={paginationLenght}
                    page={page}
                    handlePageNumber={handlePageNumber}
                    sectionRef={sectionRef}>
                </NavPaginator>}


        </div>
    </>
}


function Modal({ infos, setModal, meal }) {

    const [data, setData] = useState();

    useEffect(() => {
        const fetch_meal = async () => {
            const response = await fetch(meal(infos.idMeal));
            const json = await response.json();

            setData(json.meals[0]);
        }

        fetch_meal();

    }, [])

    useEffect(() => {

        const overflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = overflow;
        }

    }, [])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setModal({ state: false, infos: {} });
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    const parseIngredients = (obj) => {

        const result = [...Object.keys(obj)];

        const answer = result.reduce((acc, value) => {
            if (value.startsWith("strIngredient")) {
                return acc + String(obj[value] ?? "") + (obj[value] ? ", " : "")
            }

            return acc;
        }, "")

        return answer

    }

    return <div className="modal-overlay" onClick={(e) => { console.log("exit the modal"); setModal((a) => { return { state: false, infos: infos } }) }}
        tabIndex={-1}
        onKeyDown={(e) => { console.log(e.key); if (e.key === 'Esc') { console.log("esc pressed"); setModal((a) => { return { state: false, infos: infos } }) } }}>
        <div className="modal-dish" onClick={(e) => { e.stopPropagation(); }} >
            <div className="modal-dish-img">
                <img src={infos.strMealThumb} alt={infos.strMeal} />
            </div>
            <div className="dish-description">
                <div className="dish-info">
                    <div className="dish-name"><h3>Name:</h3>{infos.strMeal}</div>
                    <div className="dish-price">
                        <h3>Price: </h3>15$</div>
                    <div className="dish-rating"><h3>Rating: <Rating rate={5} /></h3></div>
                    <div className="country"><h3>Country:</h3>{data?.strCountry}</div>
                </div>
                <h3>Instructions: </h3>
                <div className="dish-description-text">
                    {data?.strInstructions}</div>
                <div className="dish-ing">
                    <h3>Ingredients:</h3>
                    {data !== undefined && parseIngredients(data)}
                </div>
            </div>
            <AddDish infos={infos} />
        </div>
    </div>

}

export function Dish({ infos, setModal }) {

    const dishNameLength = 15;

    return <div className="dish-card" onClick={(e) => { setModal((a) => { return { state: true, infos: infos } }) }}>

        <div className="dish-img">
            <img src={infos.strMealThumb} alt={infos.strMeal} />
        </div>
        <div className="dish-description">
            <div className="dish-info">
                <div className="dish-name">{infos.strMeal.length > dishNameLength ? infos.strMeal.slice(0, dishNameLength).concat("...") : infos.strMeal}</div>
                <div className="dish-rating"><Rating rate={5} /></div>
            </div>
            <div className="dish-description-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet architecto aspernatur aperiam vero nihil </div>
            <div className="dish-price">15$</div>
        </div>
        <AddDish infos={infos} />
    </div>
}

export function DishSkeleton() {

    return <div className="dish-card skeleton">

        <div className="dish-img skeleton">
            <img />
        </div>
        <div className="dish-description">
            <div className="dish-info">
                <div className="dish-name skeleton"></div>
                <div className="dish-rating"></div>
            </div>
            <div className="dish-description-text skeleton">
                {[1, 2, 3].map(a => <div key={a} className="string"></div>)}
            </div>
            <div className="dish-price skeleton"></div>
        </div>
    </div>
}


export function AddDish({ infos }) {

    const dispatch = useDispatch();
    const basket = useBasket();
    const value = basket.filter(a => a.id === infos.idMeal)[0]?.quantity ?? 0;

    return (value !== 0 && <div className="qty-container" onClick={e => { e.stopPropagation(); }}>
        <span className="rem" onClick={e => {
            e.stopPropagation();
            dispatch({ type: (value > 1) ? 'REMOVE_DUPLICATE_BASKET' : 'REMOVE_FROM_BASKET', payload: { id: infos.idMeal, name: infos.strMeal, quantity: (value - 1) < 0 ? 0 : value - 1, price: 15, img: infos.strMealThumb } })
        }}>–</span>

        <span>{value === 0 ? "" : value}</span>

        <span className="add" onClick={e => {
            e.stopPropagation();
            dispatch({ type: 'DUPLICATE_BASKET', payload: { id: infos.idMeal, name: infos.strMeal, quantity: value, price: 15, img: infos.strMealThumb } });
        }}
            onSelect={e => { e.preventDefault() }}>+</span>
    </div> || <button className="btn-add" onClick={(e) => {
        e.stopPropagation();
        console.log("stopping propagation");
        dispatch({ type: 'ADD_TO_BASKET', payload: { id: infos.idMeal, name: infos.strMeal, quantity: value + 1, price: 15, img: infos.strMealThumb } });
    }}><span>+</span></button>)


}