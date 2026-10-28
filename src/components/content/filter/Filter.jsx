import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./filter.css"
import { Search } from "lucide-react";

export default function Filter({ categories, handleUrlRequest, handlePageNumber, defaultCategory, dishes, setDishes, loading, setLoading }) {

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
    const [backup, setBackup] = useState(null);
    const [currentSearch, setCurrentSearch] = useState([]);
    const [firstLetter, setFirstLetter] = useState("");
    const timerId = useRef(null);

    const delay = useCallback((fn, ms) => {

        return function (...args) {
            clearTimeout(timerId.current);
            timerId.current = setTimeout(() => fn(...args), ms);
        }
    })

    useEffect(() => {
        if(backup === null && dishes.length > 0){
            setBackup(dishes);
        }
    }, [dishes, backup]);

    const fetch_by_letter = useCallback(async (letter) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);

        const json = await response.json();

        const meals = json.meals ?? [];

        setCurrentSearch(meals)
        setFirstLetter(letter);

        return meals;

    }, []);


    const handleSearch = async () => {
        if (search.length === 0) {
            if(backup !== null){
                setDishes(backup);
            }

            setLoading(false);
            return;
        }

        const query = search.toLowerCase();
        let meals = currentSearch;


        if (firstLetter !== query[0]) {
            console.log("we here")
            meals = await fetch_by_letter(query[0])
        } 

        const filtered = meals.filter(meal => 
            meal.strMeal.toLowerCase().startsWith(query)
        );

        console.log(filtered.length)

        setDishes(filtered);
        setLoading(false);
        
    }

    const delayed = useMemo(() => delay(handleSearch, 300), [handleSearch]);

    useEffect(() => {
        setLoading(true);
        delayed();
    }, [search])


    const placeholder = "dish name";
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
        <div className="search-container"><input type="text" placeholder={placeholder} value={search} onBlur = {(e) => {e.target.placeholder = placeholder}}onFocus={(e) => {e.target.placeholder = ""}} onChange={(e) => { setSearch(e.target.value) }} /><Search className="logo-search"/></div>
    </div >
}