import "./navbar.css"
import { Search, ShoppingBasket} from 'lucide-react'
import { NavLink } from "react-router"

import { useBasket } from "../../context/contextBasket"


export function BasketIcon({hasItems}) {
    return <>
        <ShoppingBasket />
        {hasItems > 0 && <span className="notification-dot">{hasItems}</span>}
    </>
}

export default function NavBar() {

    const basket = useBasket();

    return <nav className="navbar">
        <div className="logo">
            <img src="/logo.svg" alt="logo-image" />
        </div>
        <div className="nav-link">
            <ul>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/menu">Menu</NavLink>
                <NavLink to="/basket">Basket</NavLink>
                <NavLink to="/orders-list">Orders</NavLink>
            </ul>
        </div>
        <div className="data">
            <div className="basket">
                <NavLink to="/basket">
                    <BasketIcon hasItems={basket.length} />
            </NavLink>

            </div>
        </div>
    </nav>
}