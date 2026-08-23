import "./dish.css";

export function Dishes({dishes}) {
    return <section className="dishes">
        {
            dishes.map(dish => <article key={dish.strId}><Dish infos={{...dish}}/></article>)
        }
    </section>

    
}

export function Dish({infos}) {
    
    console.log(infos)

    return <div className="dish-card" style={{"--bg-image-meal": `url(${infos.strMealThumb})`}}>
        <div className="dish-img"></div>
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