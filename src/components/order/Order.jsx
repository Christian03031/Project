import { useState } from "react"
import "./order.css"
import "../basket/basket.css"
import { useBasket } from "../../context/contextBasket";

export function Fees(props) {
    return <div className="total-container-order">
        <div className="receipt">
            <h2>Card Totals</h2>
            <table className="receipt-table">
                <tbody>
                    <tr><td>Subtotal</td><td>{props.params.total}$</td></tr>
                    <tr><td>Delivery Fee</td><td>{props.params.deliveryFee}$</td></tr>
                    <tr><td>Total</td><td>{props.params.total + props.params.deliveryFee}$</td></tr>
                </tbody>
            </table>
        </div>
        <button className="checkout" onClick={() => null}>PROCEED TO PAYMENT</button>

    </div>
}


function OrderForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState([]);

    function handleSubmit(e) {

    }

    return <section className="form">
        <h2>Delivery Information</h2>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <input type="firstname" placeholder="First Name" />
                <input type="lastname" placeholder="Last Name" />
            </fieldset>
            <fieldset>
                <input type="city" placeholder="City" />
                <input type="address" placeholder="Address" />
            </fieldset>
            <fieldset>
                <input type="phone number" placeholder="Phone number" />
                <input type="mail" placeholder="Mail" />
            </fieldset>
        </form>
    </section>
}

export default function Order() {

    const basket = useBasket();

    const total = basket.reduce((acc, value) => acc + value.quantity * value.price, 0);

    return <div className="order-container">
        <OrderForm />
        <Fees params={{ total: total, deliveryFee: 15 }} />

    </div>
}