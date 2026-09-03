import { useBasket } from "../contextBasket"
import "./basket.css"

export function Basket() {

    const basket = useBasket();
    const total = basket.reduce((acc, value) => acc + value.quantity * value.price, 0);


    return <div className="basket-container">
        <table className="basket-table">
            <colgroup>
                <col className="dish-col" />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
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
                        <td><div><img src={a.img} alt="dish-img" /><span>{a.name}</span></div></td>
                        <td>{a.price}$</td>
                        <td>{a.quantity}</td>
                        <td>{a.price * a.quantity}$</td>
                        <td><button>X</button></td></tr>)
                }
            </tbody>
        </table>

        <div className="total-container">
            <div className="receipt">
                <table className="receipt-table">
                    <tbody>
                        <tr><td>Subtotal</td><td>{total}</td></tr>
                        <tr><td>Delivery Fee</td><td>5</td></tr>
                        <tr><td>Total</td><td>{total + 5}</td></tr>
                    </tbody>
                </table>
                <button className="checkout">PROCEED TO CHECKOUT</button>
            </div>
            <div className="promocode">
                <span>If you have a promocode, enter it here</span>
                <div className="input-container"><input type="text" placeholder="promo code"/><button>Submit</button></div>
            </div>
        </div>

    </div>
}