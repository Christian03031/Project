import "./navbar.css"
import { Search, ShoppingBasket, User } from 'lucide-react'


import { useBasket } from "../contextBasket"



export function Basket({ color, size, strokeWidth = 3, hasItems}) {
    return <>
        <ShoppingBasket />
        {hasItems > 0 && <span className="notification-dot">{hasItems}</span>}
    </>
}



export default function NavBar() {

    const basket = useBasket();
    console.log(basket.length);

    return <nav className="navbar">
        <div className="logo">
            <img src="/favicon.svg" alt="logo-image" />
        </div>
        <div className="nav-link">
            <ul>
                <li>Home</li>
                <li>Menu</li>
                <li>Basket</li>
                <li>Contact us</li>
            </ul>
        </div>
        <div className="data">
            <div className="search">
                <Search />
            </div>
            <div className="basket">
                <Basket hasItems={basket.length} />

            </div>
            <div className="user">
                <button className="sign-in">Sign in</button>
            </div>
        </div>
    </nav>
}