import { Fragment } from "react"
import NavBar from "./components/navbar/NavBar"
import Banner from "./components/content/Banner"
import backgroundImage from "./assets/images/banner.webp"
import "./main.css"

function App() {


  return <Fragment>
    <NavBar />
    <Banner backgroundImage={backgroundImage}/>
  </Fragment>
}

export default App
