import { Fragment, useEffect, useRef, useState } from "react"
import NavBar from "./components/navbar/NavBar"
import Banner from "./components/content/banner/Banner"
import Filter from "./components/content/filter/Filter"

import backgroundImage from "./assets/images/banner.webp"
import "./main.css"

function App() {

  const URL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const getData = async (url) => {
      const response = await fetch(url);
      const json = await response.json();

      console.log(json)
      console.log(json.categories)

      setCategories(json.categories);
    }


    getData(URL_CATEGORIES);

    console.log(categories);

  }, []);

  return <Fragment>
    <NavBar />
    <Banner backgroundImage={backgroundImage}/>
    <Filter categories={categories}/>
  </Fragment>
}

export default App
