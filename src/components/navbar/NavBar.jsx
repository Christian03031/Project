import "./navbar.css"
import { Search, ShoppingBasket, User } from 'lucide-react'
import { NavLink } from "react-router"

import { useBasket } from "../../context/contextBasket"


export function BasketIcon({ color, size, strokeWidth = 3, hasItems}) {
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
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/menu">Menu</NavLink>
                <NavLink to="/basket">Basket</NavLink>
                <NavLink to="/contacts">Contact us</NavLink>
            </ul>
        </div>
        <div className="data">
            <div className="search">
                <Search />
            </div>
            <div className="basket">
                <NavLink to="/basket">
                    <BasketIcon hasItems={basket.length} />
            </NavLink>

            </div>
            <div className="user">
                <button className="sign-in">Sign in</button>
            </div>
        </div>
    </nav>
}