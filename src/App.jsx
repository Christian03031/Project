import { useEffect, useState } from "react"
import NavBar from "./components/navbar/NavBar"
import Banner from "./components/content/banner/Banner"
import Filter from "./components/content/filter/Filter"
import { Dishes } from "./components/content/dishes/Dishes"
import Order from "./components/order/Order"
import { Basket } from "./components/basket/Basket"

import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import { BasketProvider } from "./context/contextBasket"

import backgroundImage from "./assets/images/banner.webp"
import "./main.css"
import OrderList from "./components/orders-list/OrderList"

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
        path: '/home',
        element: <Banner backgroundImage={backgroundImage} />
      },

      {
        path: '/orders-list',
        element: <OrderList />
      },

      {
        path: 'order',
        element: <Order />
      }
    ]
  }
]);


function MainPage() {
  const URL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const LATEST_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const meal = (id) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [categoriesURL, setCategoriesURL] = useState(URL_CATEGORIES);
  const [dishesURL, setDishesURL] = useState(LATEST_MEALS + "beef");
  const [currentDishes, setCurrentDishes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  function handleUrlRequest(str) {
    setDishesURL(LATEST_MEALS + str);
    setLoading(true);
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
      setCurrentDishes(json.meals);
      setLoading(false);
    }

    getData(categoriesURL);
    getDishes(dishesURL);
  


  }, [dishesURL]);

  return <>
    <Filter categories={categories} handleUrlRequest={handleUrlRequest} handlePageNumber={setPage} defaultCategory={"beef"} dishes = {currentDishes} setDishes = {setDishes} loading = {loading} setLoading={setLoading}/>
    <Dishes dishes={dishes} page={page} handlePageNumber={setPage} meal = {meal} loading= {loading}/>
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
