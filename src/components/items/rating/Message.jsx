import "./message.css"
import { CircleCheckIcon } from "lucide-react"
export function Message({ title, content, type, style}) {
    return <div className={`message-box ${type}`} style={style}>
        <div className="container">
            <div className="icon">

                <CircleCheckIcon color="green" />
            </div>

            <div className="infos">
                <div className="title"><h3>{title}</h3></div>
                <div className="message">{content}</div>
            </div>
        </div>
        <div className="loader"></div>
    </div>
}