import React, { useEffect } from 'react'
import './cart.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTocart,remTocart,rem } from '../action/action';
import { useSelector,useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { useLocalData } from '../reducer/cartReducer';
import { clearCart } from '../action/action';
import {loadStripe} from '@stripe/stripe-js';


export default function Cart() {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const cartItem=useSelector((state)=>state.cart.cartItems)
  console.log(cartItem)

  const handleincrement=(ItemId)=>{
        dispatch(addTocart(cartItem.find(item=>item._id===ItemId)))
  }
const handledecrement=(itemId)=>{
   dispatch(remTocart(itemId));
}
const handledelete=(itemId)=>{
  dispatch(rem(itemId));
}
const handleClearCart=()=>{ 
  dispatch(clearCart())
   
}
 
  let price = 0;
  let sellPrice = 0;
  {
    cartItem.map(item => (
      price += item.price,
      price *= item.quantity,
      sellPrice += item.sellPrice,
      sellPrice *= item.quantity
    ))
  }
  const discount = price - sellPrice;
  const total_amount = price - discount;
  const deliveryCharge = total_amount < 600 && total_amount > 0 ?99 : 0;

  const final_amount = total_amount + deliveryCharge;
  const total = total_amount < 600 ? total_amount + deliveryCharge : total_amount

 //payment integration
//  const customer={
//   name: "John Doe",
//   email: "johndoe@example.com",
//   address: {
//     line1: "123 Main Street",
//     city: "Bangalore",
//     state: "Karnataka",
//     postal_code: "560001",
//     country: "IN"
//   }
// }
 const makePayment=async()=>{
  console.log()
  const stripe = await loadStripe(process.env.REACT_APP_PUBLISH_KEY);
  const body={
      products:cartItem,
      // customer:customer
    }
    const headers={
 "Content-Type":'application/json'
    }
    const response=await fetch("http://localhost:7000/api/create-checkout-session",{
      method:'POST',
      headers:headers,
      body:JSON.stringify(body)
    });
    const session=await response.json();
    const result=stripe.redirectToCheckout({
      sessionId:session.id
    });

    if(result.error){
      console.log(result.error);
    }
    else{
      handleClearCart();
    }
 }
  
useLocalData(cartItem)

  return (
    <>



      <div className='divide'>
        <div className='cart_page' >
          {cartItem.length === 0 ? (
            <p className='empty_cart'>Your cart is empty.</p>
          ) : (
            <>
              <p><h5>My CartItem  {cartItem.length}</h5></p>

              {cartItem.map((item, index) => (
                <div className='box-class' key={item.id}>
                  <img
                    src={`https://api.aapkabazar.co/api/public/product/${item.id}/${item.images?.[0]??' '}`}
                    className='img_class'
                    alt='Product'
                  />

                  <div className='quantity_containers'> 
                   
                    <button
                    onClick={()=>handledecrement(item._id)}
                    className='quantity_button'
                      
                    >
                      -
                    </button>
                    <span style={{fontSize:'bold'}} className='quantity'>{ item.quantity }</span>
                    <button
                      onClick={() => handleincrement(item._id)}
                      className='quantity_button'
                    >
                      +
                    </button>
                  </div>


                  <p className='product_name'>{item.name}</p>
                  <button
                    onClick={() =>handledelete(item._id)}
                    className='remove_button'
                  >
                    Remove
                  </button>
                  {/* <p>{item.quantity}</p>  */}
                  <span>
                    &#8377;{item.sellPrice} <del style={{ opacity: 0.7 }}>&#8377;{item.price}</del>
                  </span>
                  <p>Unit: {item.recommendedAttribute}</p>
                  <p> Quantity : {item.quantity}</p>
                </div>
              ))}
            </>
          )}
        </div>


       {cartItem.length!=0 && (

      <div className='price_details_list'>
          <h3 className='price_details'>Price Details</h3>
          <hr />
          <p className='price_details'>MRP Total <span className='price'>&#8377; {price}</span></p><hr />
          <p className='price_details green'>Product Discount<span className='discount'>-&#8377; {discount}</span></p><hr />
          <p className='price_details'>Product Amount <span className='pay_amount'>&#8377; {total_amount}</span></p><hr />
          <p className='price_details'>Delivery Charge<span className='delivery_charge'>&#8377; {deliveryCharge}</span></p><hr />
          <p className='price_details'><strong >Total Amount<span className='total_amount'>&#8377;{total}</span></strong></p><hr />
          <p className='you_save'>you save &#8377; {discount}</p>
          <p></p>
          <div className='two_button'>
            <button className='checkout' onClick={makePayment}>CHECKOUT</button>&nbsp;
            <button className='continue_shopping' onClick={() => navigate('/')}>CONTINUE SHOPPING</button>

          </div>
         
        </div>
        
          )}
      </div>
      {cartItem.length!=0 && (
      <button  className='clear_data_button'onClick={handleClearCart}>
        Clear Your Cart
      </button>)}

    



    </>
  )
}
