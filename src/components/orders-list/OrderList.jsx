import { useState } from "react";
import "./order-list.css"
import { Package, Trash2 } from "lucide-react";


function OrderComponent({ infos, index, maxLengthShow = 3, deleteOrder}) {
    const total = infos.order.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    const flag = infos.order.length > maxLengthShow;
    const slicedInfos = infos.order.length > maxLengthShow ? infos.order.slice(0, maxLengthShow) : infos.order;

    return <div className="container-order">

        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "1.5em",
            alignItems: "center"
        }}>
            <Package size={50} color={"orange"} />
            <div className="data-order">
                <div className="content-order">
                    <ul>
                        {slicedInfos.map(a => <li>{a.quantity} * {a.name.length > 25 ? a.name.slice(0, 26).concat("...") : a.name}</li>)}
                        {flag && <li style={{ textAlign: "center" }}>&#8942;</li>}
                    </ul>
                </div>
            </div>
        </div>

        <span>Items: {infos.order.length}</span>
        <span>Total: {total}$</span>
        <span className="status done">Status: Done</span>
        <Trash2 className="delete" onClick={() => { deleteOrder(index) }} />



    </div>

}

export default function OrderList() {

    const [orders, setOrders] = useState(
        JSON.parse(localStorage.getItem("orders")) ?? []
    );

    function deleteOrder(index) {
        setOrders(a => {
            
            const filtered = a.filter((_, i) => i !== index);
        
            localStorage.setItem("orders", JSON.stringify(filtered));

            return filtered;
            
        });

    }


    return <ul className="container-order-list">
        {
            orders.map((order, i) => <li key={i} className="li-order">
                <OrderComponent infos={order} index={i} deleteOrder={deleteOrder}/>
            </li>)
        }

    </ul>
}