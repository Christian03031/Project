import "./navbar.css"
import {Search, ShoppingBasket, User} from 'lucide-react'

export default function NavBar(){
    return <nav className="navbar">
        <div className="logo">
            <img src="/favicon.svg" alt="logo-image" />
        </div>
        <div className="nav-link">
            <ul>
                <li>Home</li>
                <li>Menu</li>
                <li>Mobile App</li>
                <li>Contact us</li>
            </ul>
        </div>
        <div className="data">
            <div className="search">
                <Search color="grey" size={40} strokeWidth={3}/>
            </div>
            <div className="basket">
                <ShoppingBasket color="grey" size={40} strokeWidth={3}/>
            </div>
            <div className="user">
                <User color="grey" size={40} strokeWidth={3}/>
            </div>
        </div>
    </nav>
}