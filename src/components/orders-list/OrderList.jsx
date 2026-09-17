import "./order-list.css"

function OrderComponent({infos}){
    console.log("infos: ", infos)
    return <div className="container-order">
        <div className="logo-order"></div>
        <div className="data-order">
            <div className="content-order">
                {infos.order.map(a => `${a.name} * ${a.quantity}`).join(",")}
            </div>
            <div className="infos-order"></div>
        </div>
        <span>Items: {infos.order.length}</span>
        <span>$65</span>
        <span>Status: Done</span>
    </div>

}

export default function OrderList() {

    const orders = JSON.parse(localStorage.getItem("orders"));

    console.log(orders);

    return <ul className="container-order-list">
            {
                orders.map((order, i) => <li key={i} className="li-order">
                    <OrderComponent infos={order}/>
                </li>)
            }

        </ul>
}