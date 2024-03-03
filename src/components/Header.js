import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cart from './Cart/cart';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
// import { Dropdown } from 'react-bootstrap';



import './Head.css';
import { useNavigate } from 'react-router-dom';
import Category from './Allcategory/category';
import Apiservices from '../services/apiservice';


const Header = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [otp, setNewOtp] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState('');
  const[enterOpt,setEnterOpt]=useState('')
  const [show1, setShow1] = useState(false);
  const[logOut,setLogOut]=useState(false);
  const[emailBox,setEmailBox]=useState(false);
  const[password,setPassword]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('')


  const[productData,setProductData]=useState([]);
  useEffect(()=>{
       Apiservices.getProducts()
       .then(res=>setProductData(res.category))
       .catch(error=>console.log(error))
  },[])
  const count=useSelector(state=>state.cart.cartItems.length)

  const [login, setLogin] = useState(true);

  const loginotp = () => {

    const data = {
      userId: phoneNumber,
      networkIp: ''
    };
    fetch('https://api.aapkabazar.co/api/otp/resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responsData) => {
        setStatus(responsData.status)
        if (responsData.success) {
          toast.success(responsData.message, {
            position: "top-center",

          });
          setShowPasswordInput(false);
          setNewOtp(true);
          // alert(responsData.message)
        }

      })


  }
  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      userId: phoneNumber,
      networkIp: ''
    };
    fetch('https://api.aapkabazar.co/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    })
      .then((response) => response.json())
      .then((responseData) => {

        setStatus(responseData.status);
        setLogin(false);

        if (responseData.status === 'registered') {
          setShowPasswordInput(true);
          toast.success(responseData.message, {
            position: "top-center",

          });

        }
        else if (responseData.status === 'old') {
          setNewOtp(true);
          toast.success(responseData.message);
        }
      })
      .catch((error) => {
        toast.error('Error while making post request:', error);

      });

  }
  const loginByOtp=(event)=>{
    event.preventDefault();
    const loginOtpData={
      userId:phoneNumber,
      networkIp:'',
      otp:enterOpt,
      referalCode:''
    }
    fetch('https://api.aapkabazar.co/api/loginByOtp',{
      method:'POST',
      headers:{
        'Content-type':'Application/json'
      },
      body:JSON.stringify(loginOtpData)
    })
    .then((response)=>response.json())
    .then((res)=>{ 
    if(res.success){
      toast.success(res.message, {
        position: "top-center",
        autoClose: 2000, // Set the duration for how long the toast should be displayed
      });
  
        setShow1(false)
        localStorage.setItem('token',JSON.stringify(res?.token))
        localStorage.setItem('user',JSON.stringify(res?.user))
        console.log(res)
      }

      
    })
    

  }
  const forget_password = () => {
    setShowPasswordInput(false);
    setVerifyOtp(true);

  }


  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  let user=null;
  const getToken=()=>{
    user=JSON.parse(localStorage.getItem('user'))
    if(user){
      const name=user?.name || user?.phoneNo
      return name;
    }
    return 'login'
   
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setShow1(false);

  }
  const handleShow1 = () =>{ 
    if(!user){
      setShow1(true);
    }
    else{
      setLogOut(!logOut);
    }
  }
  


  const [data, setData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [search, setSearch] = useState(false)
  const [dropdownData, setDropdownData] = useState([]);

  const [subCategory, setSubcategory] = useState([]);
  const [drop, setIsdrop] = useState(false);


  const [products, setProducts] = useState([]);



  // const fetchData = () => {
  //   fetch('https://api.aapkabazar.co/api/root/category?cityId=619f219d26d9ad0f34102dd2')


  //     .then(response => response.json())
  //     .then(jsonData => {
  //       const dataArray = jsonData.category;
  //       // console.log(dataArray);
  //       setData(dataArray);
  //       setDropdownData(dataArray);

  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  const fetchData1 = (_id) => {
    fetch(`https://api.aapkabazar.co/api/category/subCategory/${_id}?cityId=619f219d26d9ad0f34102dd2`)

      .then(response => response.json())
      .then(Data => {
        const ray = Data.category;
        //  console.log(ray);
        setSubcategory(ray);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const products_show = (_id) => {

    navigate(`/products/${_id}`, { state: { pro: subCategory } });

  }

  const handleButtonHover = () => {
    setIsDropdownVisible(true);
    // fetchData();
  };

  const handleButtonLeave = () => {
    setIsDropdownVisible(false);
    setIsdrop(false)
  };
  const handleButton = () => {
    setSearch(true)
    // fetchData();
  }
  const handleButton1 = () => {
    const filteredData = dropdownData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDropdownData(filteredData.name);
    setSearch(true);
  };
  const handleLeave = () => {
    setSearch(false)
  }
  const handlecategory = (_id) => {
    setIsdrop(true);
    fetchData1(_id);
  }
  const handlecat = () => {
    setIsdrop(false);
  }
  const handleLogOut=()=>{

  }
  const VerifyOtp=(event)=>{
    event.preventDefault();
    const data={
      userId:phoneNumber,
      networkIp:'',
      otp:enterOpt,
      referalCode:''
    }
    fetch('https://api.aapkabazar.co/api/otp/verify',{
      method:'POST',
      headers:{
        'Content-type':'Application/json'
      },
      body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then(res=>{ 

      if(res.success){ 
        setNewOtp(false);

        setEmailBox(true);
      }
      console.log(res);
    })
  }
  const SavePassword=(event)=>{
    const data={
      ConPassword:confirmPassword,
      networkIp:'',
      otp:enterOpt,
      password:password,
      userId:phoneNumber,
      referalCode:''
    }
    fetch('https://api.aapkabazar.co/api/savePassword',{
      method:'POST',
      headers:{
        'Content-Type':'Application/Json'
      },
      body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then(res=>{
      if(res.success){
        toast.success(res.message, {
          position: "top-center",
          autoClose: 2000, // Set the duration for how long the toast should be displayed
        });
      }
      setShow1(false)
      localStorage.setItem('token',JSON.stringify(res?.token))
      localStorage.setItem('user',JSON.stringify(res?.user))
      console.log("save",res)
 
    })
  }
  const Login=(e)=>{
    e.preventDefault();
    const data={
      networkIp:'',
      password:password,
      userId:phoneNumber
    }
    fetch('https://api.aapkabazar.co/api/login',{
      method:'POST',
      headers:{
        'Content-type':'Application/Json'
      },
      body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((res)=>{ 
      if(res.success){ 
        toast.success(res.message, {
          position: "top-center",
          autoClose: 2000, // Set the duration for how long the toast should be displayed
        });
      setShow1(false)
      localStorage.setItem('token',JSON.stringify(res?.token))
      localStorage.setItem('user',JSON.stringify(res?.user))
      console.log(res)
      }
    })
  }
  const LogOut=()=>{
    console.log("local");

     localStorage.clear();
     toast.success('successfully Logout',{
       position:'top-center',
       autoClose:1500
     })
     window.location.reload();
    //  setLogOut(false)
    //  setNewOtp(false);
    //  setShow1(false);
  }
 

  return (
    <>
      <ToastContainer />

      <Navbar bg="light shadow sm" >
        <Container>
          <Navbar.Brand href="/" className='img'><img src="https://aapkabazar.co/assets/image/logo.png" className='img' ></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">


            <div onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
              <button className='all-category-button' >All Category</button>
              {isDropdownVisible && (
                <div className='card' >
                  <ul className='list-data' >
                    {productData.map(item => (
                      <li style={{ listStyleType: "none" }} onClick={() => products_show(item._id)} key={item.id} className='cursor' onMouseEnter={() => handlecategory(item._id)} >{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {drop && (
                <div className='card'>
                  <ul className='list-data1'>
                    {subCategory.map(item1 => (
                      <li key={item1.id} style={{ listStyleType: "none" }} onClick={() => products_show(item1._id)} className='cursor'>{item1.name}</li>
                    ))}
                  </ul>
                </div>

              )}
            </div>

                          {/* {isDropdownVisible &&<Category data={data}/>} */}


            <div onClick={handleButton} onMouseLeave={handleLeave} >

              <Form className="d-flex placeholder">
                <Form.Control
                  type="search"
                  placeholder="Search for Product"
                  className="me-0"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                >
                </Form.Control>
              </Form>
              {search && (
                <div className='.search_card' >
                  <ul className='search_data' >
                    {productData.filter((item)=>{
                      return searchQuery.toLowerCase()===''?true:item.name.toLowerCase().includes(searchQuery)
                    }).map((item, index) => (
                      <li onClick={() => products_show(item._id)} key={index} style={{ listStyleType: "none", cursor: "pointer" }} className='cursor' > <img src={`https://api.aapkabazar.co/api/public/cat/${item.id}/${item.images} `}
                        className='li-style' /><span className='list_style'> {item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>



            <div className='search_bar'>
              <i class="fa-solid fa-magnifying-glass"></i>


            </div>
            <button style={{ background: "none" }} className='delhi' onClick={handleShow}><i class="fa-sharp fa-solid fa-location-dot"></i>110004,Delhi</button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title className='welcome'>Welcome to AAP KA BAZZAR</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='modal_body'>
                  <p>Right Now Delivery Is Available In Delhi & NCR</p>
                </div>
                <div className='top_main'>
                  <div className='main'>
                    <div className='select'>
                      <Form.Select>
                        <option>Delhi & NCR</option>
                      </Form.Select>
                    </div>
                    <div className='select'>
                      <Form.Select aria-label="Default select example">
                        <option>enter your pin</option>
                        <option value="1">110075</option>
                        <option value="2">110074</option>
                        <option value="3">110073</option>
                        <option value="1">110045</option>
                        <option value="2">110024</option>
                        <option value="3">110056</option>
                      </Form.Select>
                      <Button variant="warning" size='lg' className='enter'>enter</Button>{' '}
                    </div>
                  </div>
                </div>



              </Modal.Body>
              <Modal.Footer>

                <Button variant="success" onClick={handleClose}>close</Button>
              </Modal.Footer>
            </Modal>

            <button style={{ background: "none" }} className='cart' onClick={() => navigate('/cart')}><span></span> <i class="fa-solid fa-cart-shopping"></i>Cart {count>0?count:''}</button>
            <button style={{ background: "none" }} className='cart' onClick={handleShow1}><i class="fa-solid fa-user" ></i>{getToken()}</button>

    
  


            <Modal show={show1} onHide={handleClose1}  >
              <Modal.Header closeButton style={{ backgroundColor: "yellow" }}>
                <Modal.Title style={{ color: "black" }}>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {login && (
                  <Form onSubmit={handleLogin}>
                    <img src="https://aapkabazar.co/assets/image/cart-login.png" className='login_image' />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Mobile Number"
                        // value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}

                      />
                    </Form.Group>
                    <Button className='warning' variant="warning" type="submit" >
                      Login
                    </Button>

                  </Form>
                )}

                {status === 'registered' && showPasswordInput && (
                  <label><br />
                    <input type="password" name="password" placeholder='Enter your password'/* required*/ className='password' onChange={(e)=>setPassword(e.target.value)} /><br /><br />
                    <button className='login_button' onClick={Login}>Login</button>
                    {/* <span className='forget_password' onClick={forget_password}>Forget password</span> */}
                    <p style={{ marginLeft: "60px", marginTop: '10px' }}>Or</p>
                    <button className='login_with_otp_button' onClick={loginotp}>Login with Otp</button>
                  </label>
                )}
                {status === 'old' && otp && (

                  <div  >
                    {/* <input type='text' name='OTP' placeholder='enter otp ' className='otp' /> */}
                    <input type="text" name="otp " placeholder='Enter otp' className='enter_otp'onChange={(e)=>setEnterOpt(e.target.value)} style={{marginLeft:'50px'}}/>
                    <button className='next_button' onClick={VerifyOtp}>Next </button>

                  </div>
                )
                }
                {
                  status === 'new' && otp && (
                    <div>
                      <input type="text" name="mobile number" placeholder='Enter otp'/* required*/ onChange={(e)=>setEnterOpt(e.target.value)} />&nbsp;
                      <button className='verify_otp_button' onClick={loginByOtp}>Verify OTP</button>
                    </div>
                  )
                }
                {verifyOtp && (
                  <div>
                    <input type="text" name="mobile number" placeholder='Enter Mobile Number'  className='SignIn' />&nbsp;<br />
                    <button className='SignIn_button'  >SignIn</button>
                  </div>
                )}
                {
                  emailBox && (
                    <div>
                        <input type="password" name="enter password" placeholder='Enter Password'  className='SignIn' onChange={(e)=>setPassword(e.target.value)}/><br/>
                        <input type="password" name="enter new password" placeholder='Confirm Password'  className='SignIn'onChange={(e)=>setConfirmPassword(e.target.value)} /><br/>
                        <button onClick={SavePassword} className='SignIn_button' >Save</button>

                        

        
                    </div>
                  )
                }


              </Modal.Body>

            </Modal>





            {/* {/ </Nav> /} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

       { logOut && (
        <div  className='list-data3'style={{right:'40px'}}>
          <ul style={{listStyle:'none',cursor:'pointer'}}>
            <li><img src='https://aapkabazar.co/assets/image/icon/users.png'width={25} height={20}style={{marginLeft:0}}/><span style={{marginLeft:'20px'}}>{getToken()}</span></li>
            <li><img src='https://aapkabazar.co/assets/image/icon/packaging.png'width={25} height={20}/><span style={{marginLeft:'20px'}}>Order</span></li>
            <li><img src='	https://aapkabazar.co/assets/image/icon/direction-sign.png
'width={25} height={20}/> <span style={{marginLeft:'20px'}}>Address</span></li>
            <li><img src='https://aapkabazar.co/assets/image/icon/24-hours.png'width={25} height={20}/><span style={{marginLeft:'20px'}}>Help Center</span></li>
            <li><img src='https://aapkabazar.co/assets/image/icon/users.png'width={25} height={20}/><span style={{marginLeft:'20px'}}>Edit Profile</span></li>
            <li onClick={LogOut}><img src='https://aapkabazar.co/assets/image/icon/logout.png'width={25} height={20}/><span style={{marginLeft:'20px'}}>Log Out</span></li>
            
          </ul>
        </div>
       )}

      {/* {/ </div> /} */}
    </>
  )
}

export default Header;




