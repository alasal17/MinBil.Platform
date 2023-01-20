import { Modal, Button } from "react-bootstrap";
import Confetti from "react-confetti";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SuccessMessages() {
    return ( 
        <div>
               <Confetti/>
              <Modal.Header >
                <Modal.Title className="formSuccessLable"><CheckCircleIcon className="mx-auto d-block  mt-1" style={{width:'60px', height:'60px'}}/> Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>
             
              </Modal.Body>
        </div>
     );
}

export default SuccessMessages;