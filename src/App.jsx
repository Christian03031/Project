import { Fragment, useEffect, useRef, useState } from "react"
import NavBar from "./components/navbar/NavBar"
import Banner from "./components/content/banner/Banner"
import Filter from "./components/content/filter/Filter"
import {Dishes, Dish} from "./components/content/dishes/Dishes"

import backgroundImage from "./assets/images/banner.webp"
import "./main.css"

function App() {

  const URL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const LATEST_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=beef'; 

  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {

    const getData = async (url) => {
      const response = await fetch(url);
      const json = await response.json();

      setCategories(json.categories);
    }

    const getDishes = async (url) => {
      const response = await fetch(url);
      const json = await response.json();

      setDishes(json.meals);
    }

    getData(URL_CATEGORIES);
    getDishes(LATEST_MEALS);

  }, []);

  return <Fragment>
    <NavBar />
    <Banner backgroundImage={backgroundImage}/>
    <Filter categories={categories}/>
    <Dishes dishes={dishes}/>
  </Fragment>
}

export default App
