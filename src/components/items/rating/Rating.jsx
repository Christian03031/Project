export default function Rating({max = 5, rate = 5}){
    return <div className="rating">
        {
            Array.from({length: max}, (_, i) => (
                <span key={i}>
                    {i <= Math.trunc(rate) ? "★" : "☆"}    
                </span>
            ))
        }
    </div>
}