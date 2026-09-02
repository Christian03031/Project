import { Fragment, useEffect, useRef, useState } from "react"
import NavBar, { BasketIcon } from "./components/navbar/NavBar"
import Banner from "./components/content/banner/Banner"
import Filter from "./components/content/filter/Filter"
import { Dishes } from "./components/content/dishes/Dishes"

import { Basket } from "./components/basket/Basket"

import { createBrowserRouter, RouterProvider, Outlet, useParams } from "react-router"
import { BasketProvider } from "./components/contextBasket"

import backgroundImage from "./assets/images/banner.webp"
import "./main.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/menu',
        element: <MainPage />
      },
      {
        path: '/basket',
        element: <Basket />
      },
      {
        path: '/dish/:id',
        element: <h1>Dish {0}</h1>
      },

      {
        path: '/home',
        element: <h1>Home</h1>
      },

      {
        path: '/contacts',
        element: <h1>Contact Us</h1>
      },
    ]
  }
]);


function MainPage() {
  const URL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const LATEST_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [categoriesURL, setCategoriesURL] = useState(URL_CATEGORIES);
  const [dishesURL, setDishesURL] = useState(LATEST_MEALS + "beef");

  const [page, setPage] = useState(1);

  function handleUrlRequest(str) {
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

  return <>
    <Banner backgroundImage={backgroundImage} />
    <Filter categories={categories} handleUrlRequest={handleUrlRequest} handlePageNumber={setPage} />
    <Dishes dishes={dishes} page={page} handlePageNumber={setPage} />
  </>
}

function Layout() {
  return <BasketProvider>
    <NavBar />
    <Outlet />
  </BasketProvider>
}



function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
