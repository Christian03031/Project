import { Fragment, useEffect, useRef, useState } from "react"
import NavBar, { Basket } from "./components/navbar/NavBar"
import Banner from "./components/content/banner/Banner"
import Filter from "./components/content/filter/Filter"
import { Dishes } from "./components/content/dishes/Dishes"

import { createBrowserRouter } from "react-router"
import { BasketProvider } from "./components/contextBasket"

import backgroundImage from "./assets/images/banner.webp"
import "./main.css"



function App() {
  const URL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const LATEST_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [categoriesURL, setCategoriesURL] = useState(URL_CATEGORIES);
  const [dishesURL, setDishesURL] = useState(LATEST_MEALS + "beef");

  const [page, setPage] = useState(1);

  function handleUrlRequest(str){
    setDishesURL(LATEST_MEALS + str);
  }

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

    getData(categoriesURL);
    getDishes(dishesURL);

  }, [dishesURL]);

  console.log(page);

  return <BasketProvider>
    <NavBar />
    <Banner backgroundImage={backgroundImage} />
    <Filter categories={categories} handleUrlRequest = {handleUrlRequest} handlePageNumber = {setPage}/>
    <Dishes dishes={dishes} page = {page} handlePageNumber = {setPage}/>
  </BasketProvider>
}

export default App
