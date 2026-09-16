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
            <button className="checkout" onClick={() => null}>PROCEED TO PAYMENT</button>
        </div>

    </div>
}


function OrderForm() {

    const [infos, setInfos] = useState({
        firstName: "",
        lastName: "",
        address: "",
        mail: "",
        phone: []
    })

    function handleSubmit(e) {

    }

    function handlePhoneNumber(e) {
        const digit = e.key;

        const isDigit = (e) => /^[0-9]$/.test(e);

        if (isDigit(digit)) {
            if (infos.phone.length < 10) {
                setInfos({ ...infos, phone: [...infos.phone, Number(digit)] });
            }
        }

        if (digit === 'Backspace') {
            setInfos({ ...infos, phone: infos.phone.slice(0, infos.phone.length - 1) });
        }
    }

    function phoneFormatter(arr) {
        if (arr.length === 0) return ""
        else {
            const numberArr = [
                `+7 (${arr.slice(0, 3).join("")}${arr.length >= 3 ? ")" : ""}`,
                `${arr.length >= 3 ? " " : ""}${arr.slice(3, 6).join("")}`,
                `${arr.length >= 6 ? " " : ""}${arr.slice(6, 8).join("")}`,
                `${arr.length >= 8 ? " " : ""}${arr.slice(8, 10).join("")}`
            ]

            return numberArr.join("")
        };
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
                <input type="mail" placeholder="christian@gmail.com" />
                <input type="phone" value={`${phoneFormatter(infos.phone)}`} onKeyDown={e => handlePhoneNumber(e)} onChange={() => { }} placeholder="Phone number" />
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