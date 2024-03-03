import React from 'react'
import './products.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState ,useRef} from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addTocart,remTocart } from '../action/action';
import { useLocalData } from '../reducer/cartReducer';



export default function Products() {
  const [productData, setProductData] = useState([]);
  const [productCartDetails, setProductCartDetails] = useState([])
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1); // Initialize the page number to 1.
  const loadingRef = useRef(null);
  const dispatch=useDispatch();
   
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems,'cartitem')

  const handleIncrement = (product) => {
    dispatch(addTocart(product));
    // console.log(product);
  };
const handleDecrement=(itemId)=>{
  dispatch(remTocart(itemId));
}
  const getquantity = (itemId) => {
    const cartitem = cartItems.find((item) => item._id === itemId);
    return cartitem ? cartitem.quantity : 0;
  };

  // const [products, setProducts] = useState([]);

  const navigate = useNavigate();

   const params = useParams();
  const {id} = params;
  
  // console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.aapkabazar.co/api/category/products/all?categoryId=${id}&cityId=619f219d26d9ad0f34102dd2&limit=${20}`);
        const jsonData = await response.json();
         setProductData(jsonData.products);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [id])
 

  const[data,setData]=useState([])
   const [productdata,setProductdata]=useState([]);
  // const setData = useStore((state) => state.setData)


  const location = useLocation();
  const products = location.state?.data || [];
  const sub = location.state?.pro || [];

  const product_details = (_id) => {
    fetch(`https://api.aapkabazar.co/api/product?productId=${_id}&cityId=619f219d26d9ad0f34102dd2`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('productData', JSON.stringify(data.product));
        setData(data.products);
        console.log(data.product);
        setProductCartDetails(data.product);
        navigate('/productdetails');
      })
      .catch(error => {
        console.log("Error fetching data :", error)
      })

    console.log(_id);

  }
  const sortProducts = () => {
    const sortedProducts = [...productData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.sellPrice - b.sellPrice;
      } else if (sortOrder === 'desc') {
        return b.sellPrice - a.sellPrice;
      }
      else if (sortOrder === 'ascdis') {
        return a.discount - b.discount;
      }
      else if (sortOrder === 'descdis') {
        return b.discount - a.discount;
      }
    });
    setProductData(sortedProducts);
  };
  

useLocalData(cartItems);
  return (
    <>
                <div ref={loadingRef} style={{ height: '10px' }} />

      <div className='top'>
        <ul>
          {sub.map(item => (
            <li key={item.id} style={{ listStyleType: "none", lineHeight: 4 }}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div className='sorting-buttons'>
        <button onClick={() => { setSortOrder('desc'); sortProducts(); }}>Low price</button>&nbsp;
        <button onClick={() => { setSortOrder('asc'); sortProducts(); }}>High price</button>
       

      </div>
     
      <h4 className='text-center'>Product</h4>


      {productData.map(item => (
        <div className='row' >


          <div className='card card1 '>

            <div className='upper-one'>{Math.round(item.discount)}% off</div>
            
            <img src={`https://api.aapkabazar.co/api/public/product/${item.id}/${item.images[0]} `} style={{ width: "190px", textAlign: "center" }} alt="..." className='cursor'onClick={() => product_details(item._id)} />
            <div className="card-body">
              <p className="card-title">{item.name}</p>
              <p className="card-price"><span>&#8377;</span>{item.sellPrice} <del><span><span>&#8377;</span>{item.price}</span></del></p>

               {getquantity(item._id) === 0 ? (
              <button className="addbutton" onClick={() => handleIncrement(item)}>
                Add to Cart
              </button>
            ) : (
              <button className='mainbutton' >
                <button className='sub'onClick={()=>handleDecrement(item._id)} >-</button>
                <span>{getquantity(item._id)}</span>
                <button onClick={() => handleIncrement(item)} className='addb'>+</button>
              </button>
            )}
            </div>
          </div>
        </div>

      ))}

    </>
  )
}
