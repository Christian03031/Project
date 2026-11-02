import { FaceSlightlyFrowning } from "lucide-react";
import "./emptyMessage.css"



export function EmptyMessage({navigate, style, size = 60, strokeWidth = 2.8, link = true, children}) {

    return <div className="basket-container-empty" style={style}>
        <div className="label-empty">
            <FaceSlightlyFrowning size={size} strokeWidth={strokeWidth} color="black"/>
            <h1>Empty</h1>
        </div>
        <div className="label-content">
            {children}
            {link && <button onClick={() => { navigate("/menu") }}>To menu</button>}
        </div>
    </div>
}