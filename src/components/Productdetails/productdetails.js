import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../Header';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './productdetails.css';
import { useParams } from 'react-router-dom';
import { Form, Modal } from 'react-bootstrap';
import { addTocart,remTocart } from '../action/action';
import { useSelector,useDispatch } from 'react-redux';
import { useLocalData } from '../reducer/cartReducer';

export default function Productdetails() {

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [quantity1, setQuantity1] = useState('');
  const [quantityState, setQuantityState] = useState(0); 
  const dispatch=useDispatch();

  const cartItem=useSelector(state=>state.cart.cartItems)
  console.log(cartItem,"IEI")

  const handleIncrement=(item)=>{ 
    dispatch(addTocart(item));
    
  }
  const handleDecrement=(itemId)=>{
    dispatch(remTocart(itemId));
  }
const getquantity=(itemId)=>{
  const items=cartItem.find((item)=>item._id===itemId)
  return items?items.quantity:0
}



  

  

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Mobile:', mobile);
    console.log('Quantity:', quantity);
    setName('');
    setAddress('');
    setMobile('');
    setQuantity('');
    setShowModal(false);
  };


  const [cartItems, setCartItems] = useState([]);

  const [quantity, setQuantity] = useState(0);

  const [productDetails, setProductDetails] = useState([]);



  useEffect(() => {
    const storedData = localStorage.getItem('productData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProductDetails(parsedData);
      console.log(productDetails);
    }

  }, [])


  // const handleAdd = () => {
  //   if (quantity < 5) {
     
  //     setQuantity(quantity + 1);
    
  //     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  //   // Check if the productDetails is already in the cartItems
  //   const existingItem = storedCartItems.find(item => item.id === productDetails.id);

  //   if (existingItem) {
  //     // If the productDetails is already in the cartItems, update its quantity
  //     const updatedCartItems = storedCartItems.map(item => {
  //       if (item.id === productDetails.id) {
  //         return { ...item, quantity: item.quantity + 1 };
  //       }
  //       return item;
  //     });

  //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //     setCartItems(updatedCartItems);
  //   } else {
  //     // If the productDetails is not in the cary
  // tItems, add it with quantity 1
  //     const updatedCartItem = { ...productDetails, quantity: 1 };
  //     const updatedCartItems = [...storedCartItems, updatedCartItem];

  //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //     setCartItems(updatedCartItems);
  //   }

  //   }
  // };



  // const handleSubtract = () => {
  //   if (quantity > 0) {
  //     setQuantity(quantity - 1);


  //     const updatedCartItems = cartItems.slice(0, -1);
  //     setCartItems(updatedCartItems);

  //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //   }
  // };
useLocalData(cartItem)
  return (
    <>
      <div className='all-cover'>
        <div className='img-sec'>
        <img
  src={`https://api.aapkabazar.co/api/public/product/${
    productDetails.id
  }/${
    Array.isArray(productDetails.images)
      ? productDetails.images[0]
      : productDetails.image 
  }`}
  style={{ width: "70%" }}
  className="img-style"
/>
        </div>
        <div className='details-sec'>
          <p className='data_name '>{productDetails.name}</p>
          <span style={{ fontSize: "larger" }} >&#8377;</span><span className='data_name'>{productDetails.sellPrice}</span>    <del style={{ fontSize: "larger" }}><span >&#8377;</span>{productDetails.price}</del>
          <p style={{ marginTop: "10px" }}><b>Unit :</b>{productDetails.recommendedAttribute}</p>
          <p><b>SKU  :{productDetails.sku}</b></p>
          <div className='main_button'>

         


            {getquantity(productDetails._id) === 0 ? (
              <button className='add_button' onClick={()=>handleIncrement(productDetails)}>Add to Cart</button>
            ) : (
              <div>
                <button className='add_button' style={{ background: "yellow" }}>
                  <button onClick={()=>handleIncrement(productDetails)} className='add' style={{ backgroundColor: "yellow" }}>+</button>
                  <span>{getquantity(productDetails._id)}</span> 
                  <button onClick={()=>handleDecrement(productDetails._id)} className='add' style={{ background: "yellow" }}>-</button>
                </button>
              </div>
            )}
            <button className='add_button' style={{ marginLeft: 20 }} onClick={handleShowModal}>Bulk Order</button>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Welcome To Aap Ka Bazar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" style={{ marginTop: 10 }}>
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>


          </div>



          <div className='footer'>Why Shop From Aap ka Bazar</div>
          <div >
            <ul className='img-style'>
              <li><img src='	https://aapkabazar.co/assets/image/detail-3.png' className='img-first' /><span style={{ fontSize: "small" }}> 100% Return Available</span></li>
              <li><img src='https://aapkabazar.co/assets/image/detail-1.png' className='img-first' /><span style={{ fontSize: "small" }}> Orignal Branded Product</span></li>
              <li><img src='https://aapkabazar.co/assets/image/detail-2.png' className='img-first' /><span style={{ fontSize: "small" }}> Pure & Hygencially Packed</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='description'>
        <p style={{ margin: "10px" }}><b>Description</b></p><hr />
        <p className='Desc'>{productDetails.description}</p>


      </div>
    </>
  )
}
