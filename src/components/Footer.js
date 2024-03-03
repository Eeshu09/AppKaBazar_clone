import {Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import useStore from './Stores/stores';
import Demo from './Demo';


const Footer = () => {
  const data=useStore((state)=>state.data);
  return (
<div>       
          <h1> {data.message}</h1>
    </div>
  )
}

export default Footer;


{/* <Modal show={showModal} onHide={handleCloseModal}>
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

    <Button variant="primary" type="submit" style={{marginTop:10}}>
      Submit
    </Button>
  </Form>
</Modal.Body>
</Modal>

const [showModal, setShowModal] = useState(false);
const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [mobile, setMobile] = useState('');
const [quantity1, setQuantity1] = useState('');

const handleShowModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Perform any necessary actions with the form data
  console.log('Name:', name);
  console.log('Address:', address);
  console.log('Mobile:', mobile);
  console.log('Quantity:', quantity);
  // Clear the form fields
  setName('');
  setAddress('');
  setMobile('');
  setQuantity('');
  // Close the modal
  setShowModal(false);
};
      onClick={handleShowModal} */}
