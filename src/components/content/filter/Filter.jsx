import { useEffect, useRef, useState } from "react"
import "./filter.css"

export default function Filter({ categories }) {

    const containerRef = useRef(null);
    const timeOutRef = useRef(null);

    useEffect(() => {


        const container = containerRef.current;
        const timer = timeOutRef.current;

        const handleWheel = (event) => {

            event.preventDefault();

            if (timer) return;

            container.scrollLeft += 3 * event.deltaY;

            timeOutRef.current = setTimeout(() => { timeout = null; }, 100)

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
                categories.map(a =>
                    <li key={a.idCategory}>
                        <div className="image-wrapper">
                            <img src={a.strCategoryThumb} alt={`cat-${a.idCategory}`} />
                        </div>
                        <span>{a.strCategory}</span>
                    </li>
                )
            }
        </ul>

        <hr className="separator" />
    </div>
}