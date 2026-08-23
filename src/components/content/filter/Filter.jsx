import { useEffect, useRef } from "react"
import "./filter.css"

export default function Filter({ categories }) {

    const containerRef = useRef(null);
    const timeOutRef = useRef(null);

    useEffect(() => {
        let   timer = null;
        const container = containerRef.current;
        const handleWheel = (event) => {

            event.preventDefault();

            if (timer) return;

            container.scrollLeft += 3 * event.deltaY;

            timer = setTimeout(() => { timer = null;}, 100)

        }

        container.addEventListener("wheel", handleWheel, {
            passive: false
        })

        return () => {
            container.removeEventListener("wheel", handleWheel);
            clearTimeout(timeOutRef.current);
        }

    }, []);

    return <div className="filter-section">
        <div className="text-filter">
            <h2>Explore our menu</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy you cravings and elevate your dining experience, one delicious meal at a time.</p>
        </div>
        <ul ref={containerRef}>
            {
                categories.map(a => <li key={a.idCategory}
                            style={{ "--bg-image": `url(${a.strCategoryThumb})` }}>
                                <div className= "image-container"/>
                                <span>{a.strCategory}</span>
                        </li>
                        
                )
            }
        </ul>

        <hr className="separator" />
    </div >
}