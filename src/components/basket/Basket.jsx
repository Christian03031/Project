import { useBasket } from "../contextBasket"
import "./basket.css"

export function Basket() {

    const basket = useBasket();


    return <div className="basket-container">
        <table className="basket-table">
            <thead>
                <tr>
                    <td>Dish</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                    <td>Action</td>
                </tr>
            </thead>

            <tbody>
                {
                    basket.map(a => <tr key={a.id}>
                        <td>a.id</td>
                        <td>a.id</td>
                        <td>{a.quantity}</td>
                        <td>a.id</td>
                        <td><button>X</button></td></tr>)
                }
            </tbody>
        </table>
    </div>
}