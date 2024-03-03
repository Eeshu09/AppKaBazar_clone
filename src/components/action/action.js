
export const addTocart=(product)=>{
    return{
        type:"ADD_CART",
        payload:product
    };
}
export const remTocart=(itemId)=>{
    return{
        type:'REM_CART',
        payload:itemId
    }
}
export const rem=(itemId)=>{
    return{
        type:'REM',
        payload:itemId
    }
}
export const clearCart = () => {
    return {
      type: 'CLEAR_CART',
    };
  };
  