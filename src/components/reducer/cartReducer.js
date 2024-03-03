import { useEffect } from "react";
const getLocaldata=()=>{
    const localData=localStorage.getItem('eeshu');
    if(!localData){
        return []
    }else{
        return JSON.parse(localData)
    }
}

export const useLocalData=(cartItems)=>{
    useEffect(()=>{
          localStorage.setItem('eeshu',JSON.stringify(cartItems))
    },[cartItems])
}

const initialstate={
    cartItems:getLocaldata(),
}
const cartReducer=(state=initialstate,action)=>{
    switch(action.type){
        case 'ADD_CART':
            const existingItem=state.cartItems.find((item)=>item._id===action.payload._id);
            if(existingItem){ 
                if(existingItem.quantity>=5){
                    alert("you cant add this product more")
                    return state;
                }
                return{
                    ...state,cartItems:state.cartItems.map((item)=>item._id===action.payload._id?{...item,quantity:item.quantity+1}:item)
                }
            }
            else{
                return{
                    ...state,cartItems:[...state.cartItems,{...action.payload,quantity:1}]
                }
            }
            case 'REM':
                return{
                    ...state,cartItems:state.cartItems.filter((item)=>item._id!==action.payload)
                }

           
        case 'REM_CART':
            const exist=state.cartItems.find((item)=>item._id===action.payload)
            if(exist.quantity>1){
                return{
                    ...state,cartItems:state.cartItems.map((item)=>item._id===action.payload?{...item,quantity:item.quantity-1}:item)
                }
            }
            else{
                return{
                    ...state,cartItems:state.cartItems.filter((item)=>item._id!==action.payload),
                }
            }
            case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [], 
      }; 
        default :
        return state; 

    }
   
}
export default cartReducer;