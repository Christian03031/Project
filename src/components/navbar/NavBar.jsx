import "./navbar.css"
import { Search, ShoppingBasket, User } from 'lucide-react'


export function Basket({color, size, strokeWidth = 3, hasItems}) {
    return <>
        <ShoppingBasket />
        {hasItems && <span className="notification-dot"></span>}
    </>
}


export default function NavBar() {
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
                <Search/>
            </div>
            <div className="basket">
                <Basket hasItems={true}/>
                
            </div>
            <div className="user">
                <button className="sign-in">Sign in</button>
            </div>
        </div>
    </nav>
}