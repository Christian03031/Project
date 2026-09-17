import { useReducer, useContext, createContext, useEffect } from "react";

const basketContext = createContext(null);
const dispatchContext = createContext(null);

function basketReducer(basketContent, action){
    switch(action.type){
        case 'ADD_TO_BASKET': {
            if([...basketContent.filter(a => a.id === action.payload.id)].length) return [...basketContent.filter(a => a.id !== action.payload.id), {...action.payload, quantity: action.payload.quantity + 1}]
            return [...basketContent, {...action.payload}]
        };

        case 'DUPLICATE_BASKET': {
            return [...basketContent.map(a => a.id === action.payload.id ? {...a, quantity: a.quantity + 1} : a)]
        }

        case 'REMOVE_FROM_BASKET': return [...basketContent.filter(a => a.id != action.payload.id)];

        case 'REMOVE_DUPLICATE_BASKET': return  [...basketContent.map(a => a.id === action.payload.id ? {...a, quantity: a.quantity - 1} : a)];

        case 'FREE_BASKET': return [];
        
        default: return basketContent;
    }
}

export function useBasket(){
    return useContext(basketContext);
}

export function useDispatch(){
    return useContext(dispatchContext);
}
 

const restoreBasket = (initial = []) => {
    const saved = localStorage.getItem("basketState");
    return saved ? JSON.parse(saved) : initial; 
}

export function BasketProvider({ children }){
    
    const [basket, dispatch] = useReducer(basketReducer, initialBasketState, restoreBasket)
    
    useEffect(() => {
        localStorage.setItem("basketState", JSON.stringify(basket));
    }, [basket])

    return (<basketContext.Provider value = {basket}>
        <dispatchContext.Provider value = {dispatch}>
            {children}
        </dispatchContext.Provider>
    </basketContext.Provider>)
}

let initialBasketState = [];