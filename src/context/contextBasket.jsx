import { useReducer, useContext, createContext } from "react";

const basketContext = createContext(null);
const dispatchContext = createContext(null);

function basketReducer(basketContent, action){
    switch(action.type){
        case 'ADD_TO_BASKET': {
            if([...basketContent.filter(a => a.id === action.payload.id)].length0) return [...basketContent.filter(a => a.id !== action.payload.id), {...action.payload, quantity: action.payload.quantity + 1}]
            return [...basketContent, {...action.payload}]
        };

        case 'DUPLICATE_BASKET': {
            return [...basketContent.filter(a => a.id !== action.payload.id), {...action.payload, quantity: action.payload.quantity + 1}]
        }

        case 'REMOVE_FROM_BASKET': return [...basketContent.filter(a => a.id != action.payload.id)];

        case 'REMOVE_DUPLICATE_BASKET': return  [...basketContent.filter(a => a.id !== action.payload.id), {...action.payload, quantity: action.payload.quantity - 1}];
        default: return basketContent;
    }
}

export function useBasket(){
    return useContext(basketContext);
}

export function useDispatch(){
    return useContext(dispatchContext);
}
 
export function BasketProvider({ children }){
    
    const [basket, dispatch] = useReducer(basketReducer, initialBasketState)
    
    return (<basketContext.Provider value = {basket}>
        <dispatchContext.Provider value = {dispatch}>
            {children}
        </dispatchContext.Provider>
    </basketContext.Provider>)
}

let initialBasketState = [];