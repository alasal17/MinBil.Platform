
import { Modal, Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from '../login/Login';
import Register from '../register/Register';
import './authpage.css'

function AuthPage() {

  
    return (
      <div style={{}}>
    
   
   
   <Modal show={true}>

   <Tabs
      defaultActiveKey="login"
      id="uncontrolled-tab-example"
      className="mb-3 "
      fill 
    >
      
      <Tab  eventKey="login" title="Logg inn" >
      <Modal.Header >
			<Modal.Title ariaSelected="true">Logg inn</Modal.Title>
</Modal.Header>
        <Login/>
      
      </Tab>


      <Tab eventKey="register" title="Ny bruker">
        <Modal.Header>
			<Modal.Title className="">Register deg</Modal.Title>
        </Modal.Header>

        <Register/>
      </Tab>
      
    </Tabs>
  
</Modal>
    </div>
    )
  }
  
  export default AuthPage