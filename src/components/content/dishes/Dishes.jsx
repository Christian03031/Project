import { useState } from "react";
import "./dish.css";

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
            <AddDish />
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

export function AddDish(){



    const [value, setValue] = useState(0);

    return (value !== 0 && <div className="qty-container">
        <span className="rem" onClick={e => {console.log(value); setValue(value => value - 1 <= 0 ? 0 : value - 1)}}>-</span>
        <span>{value === 0 ? "" : value}</span>
        <span className="add" onClick={e => {console.log(value); setValue(value => value + 1 >= 10 ? 10 : value + 1)}}
            onSelect={e => {e.preventDefault()}}>+</span>
    </div> || <button className="btn-add" onClick={(e)=>setValue(value => value + 1)}><span>+</span></button> )
    

}