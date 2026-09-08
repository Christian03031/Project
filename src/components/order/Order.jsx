import { useState } from "react"
import "./order.css"
import "../basket/basket.css"

import { Fees } from "../basket/Basket";

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
            <input type="firstname" placeholder="First Name" />
            <input type="lastname" placeholder="Last Name" />
        </form>
    </section>
}

export default function Order() {
    return <div className="order-container">
            <OrderForm />
            <Fees params={{total : 0, deliveryFee: 15}}/>

    </div>
}