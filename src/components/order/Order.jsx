import { useState } from "react"
import "./order.css"
import "../basket/basket.css"
import { useBasket, useDispatch } from "../../context/contextBasket";

function handleOrders(order, infos, dispath) {
    let currentOrders = localStorage.getItem("orders");
    let data = JSON.parse(currentOrders) ?? [];
    
    data.push({order: order.map((e) => ({id: e.id, name: e.name, quantity: e.quantity, price: e.price})), ...infos });
    
    localStorage.setItem("orders", JSON.stringify(data));
    
    dispath({type: 'FREE_BASKET'});
}


function Fees({params, infos}) {
    
    const dispath = useDispatch();
    const basket = useBasket();
    return <div className="total-container-order">
        <div className="receipt">
            <h2>Card Totals</h2>
            <table className="receipt-table">
                <tbody>
                    <tr><td>Subtotal</td><td>{params.total}$</td></tr>
                    <tr><td>Delivery Fee</td><td>{params.deliveryFee}$</td></tr>
                    <tr><td>Total</td><td>{params.total + params.deliveryFee}$</td></tr>
                </tbody>
            </table>
            <button className="checkout" onClick={(e) => { handleOrders(basket, infos, dispath) }}>ORDER NOW</button>
        </div>

    </div>
}


function OrderForm({infos, phoneFormatter, handlePhoneNumber, handleSubmit, setInfos}) {


    return <section className="form">
        <h2>Delivery Information</h2>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <input type="firstname" placeholder="First Name" onChange={e => setInfos({...infos, firstName: e.target.value})}/>
                <input type="lastname" placeholder="Last Name" onChange={e => setInfos({...infos, lastName: e.target.value})}/>
            </fieldset>
            <fieldset>
                <input type="city" placeholder="City" onChange={e => setInfos({...infos, city: e.target.value})}/>
                <input type="address" placeholder="Address" onChange={e => setInfos({...infos, address: e.target.value})}/>
            </fieldset>
            <fieldset>
                <input type="mail" placeholder="christian@gmail.com" onChange={e => setInfos({...infos, mail: e.target.value})}/>
                <input type="phone" value={`${phoneFormatter(infos.phone)}`} onKeyDown={e => handlePhoneNumber(e)} onChange={() => {}} placeholder="Phone number" />
            </fieldset>
        </form>
    </section>
}

export default function Order() {

    const basket = useBasket();

    const total = basket.reduce((acc, value) => acc + value.quantity * value.price, 0);

    const [infos, setInfos] = useState({
        firstName: "",
        lastName: "",
        address: "",
        mail: "",
        phone: []
    })

    function handleSubmit(){

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
                `${arr.length >= 3 ? "-" : ""}${arr.slice(3, 6).join("")}`,
                `${arr.length >= 6 ? "-" : ""}${arr.slice(6, 8).join("")}`,
                `${arr.length >= 8 ? "-" : ""}${arr.slice(8, 10).join("")}`
            ]

            return numberArr.join("")
        };
    }


    return <div className="order-container">
        <OrderForm infos = {infos} phoneFormatter={phoneFormatter} handlePhoneNumber={handlePhoneNumber} handleSubmit={handleSubmit} setInfos={setInfos}/>
        <Fees params={{ total: total, deliveryFee: 15 }} infos={infos} />
    </div>
}