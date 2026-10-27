import { useCallback, useEffect, useRef, useState } from "react"
import "./filter.css"

export default function Filter({ categories, handleUrlRequest, handlePageNumber, defaultCategory, dishes, setDishes}) {

    const containerRef = useRef(null);
    const timeOutRef = useRef(null);

    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        let timer = null;
        const container = containerRef.current;
        const handleWheel = (event) => {

            event.preventDefault();

            if (timer) return;

            container.scrollLeft += 3 * event.deltaY;

            timer = setTimeout(() => { timer = null; }, 100)

        }

        container.addEventListener("wheel", handleWheel, {
            passive: false
        })

        return () => {
            container.removeEventListener("wheel", handleWheel);
            clearTimeout(timeOutRef.current);
        }

    }, []);


    const [search, setSearch] = useState("");
    const [currentSearch, setCurrentSearch] = useState([]);

    const delay = useCallback((fn, ms) => {
        let timerId;

        return function(...args){
            clearTimeout(timerId);
            timerId = setTimeout(() => this.call(args), ms);
        }
    })

    useEffect(() => {
        
        if (search.length === 1) {
            const fetch_by_letter = async () => {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);

                const json = await response.json();

                setCurrentSearch(json.meals)
                setDishes(json.meals);
            }
            
            fetch_by_letter();
        }

        if(search.length > 1){
            setDishes(currentSearch.filter(a => a.strMeal.toLowerCase().startsWith(search.toLowerCase())));
        }
        else{
            setDishes(dishes);
        }

    }, [search])

    console.log(search);

    return <div className="filter-section">
        <div className="text-filter">
            <h2>Explore our menu</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy you cravings and elevate your dining experience, one delicious meal at a time.</p>
        </div>
        <ul ref={containerRef}>
            {
                categories.map(a => <li key={a.idCategory}
                    style={{ "--bg-image": `url(${a.strCategoryThumb})` }}
                    onClick={() => {
                        if (a.idCategory === selected) {
                            handlePageNumber(1);
                            setSelected(-1);
                            handleUrlRequest(defaultCategory)
                        }
                        else {
                            handlePageNumber(1);
                            setSelected(a.idCategory);
                            handleUrlRequest(a.strCategory)
                        }

                    }}>
                    <div className={`image-container${selected === a.idCategory ? " selected" : ""}`} />
                    <span>{a.strCategory}</span>
                </li>

                )
            }
        </ul>

        <hr className="separator" />
        <div className="search-container"><input type="text" placeholder="dish name" value={search} onChange={(e) => { setSearch(e.target.value) }} /></div>
    </div >
}