import { useState } from "react";
import "./dish.css";

import { useBasket, useDispatch } from "../../contextBasket";


export function Dishes({ dishes }) {
    return <section className="dishes">
        {
            dishes.map(dish => <article key={dish.strId}><Dish infos={{ ...dish }} /></article>)
        }
    </section>


}

export function Dish({ infos }) {

    return <div className="dish-card" style={{ "--bg-image-meal": `url(${infos.strMealThumb})` }}>

        <div className="dish-img">
            <AddDish id={infos.strId} />
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
        }}>-</span>

        <span>{value === 0 ? "" : value}</span>

        <span className="add" onClick={e => {
            setValue(value => value + 1 >= 10 ? 10 : value + 1);
            dispatch({ type: 'ADD_TO_BASKET', payload: { id: id, quantity: value + 1 } });
            console.log(basket);
        }}
            onSelect={e => { e.preventDefault() }}>+</span>
    </div> || <button className="btn-add" onClick={(e) => {
        setValue(value => value + 1);
        dispatch({ type: 'ADD_TO_BASKET', payload: { id: id, quantity: value + 1 } });
        console.log(basket);
    }}><span>+</span></button>)


}