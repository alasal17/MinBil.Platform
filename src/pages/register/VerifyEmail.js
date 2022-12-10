import './verifyEmail.css'

import {useState, useEffect} from 'react'

import {useNavigate, Link} from 'react-router-dom'


function VerifyEmail() {



  const navigate = useNavigate()
  const [count, setCount] = useState(5);
  
  setInterval(() => setCount(count - 1), 1000);
  useEffect(() => {
    setTimeout(() =>{
       
      navigate('/')
     }, 5000)

    
      return <p></p>
    
  },);
  
 
  
  return (
    <div>
          <div className="login">
    <div className='auth'>
      <div className='verifyEmail'>
        <h1>Registert</h1>
        
        <div style={{paddingTop:'20px'}}>
          <strong>Du kan nå logge inn med din registrerte din e-post adresse.</strong><br/>
         
        </div>
        <span>Har du noe feil med registeringen eller om det er noe du lurer på, kan du kontakte oss</span>
        <hr />
    
      
        <span>Går til logg inn siden om: </span><span style={{color:'green', fontWeight: 'bold'}}> {count}</span>
              
       
      </div>
      
    </div>
    </div>
         
        </div>
  )
}

export default VerifyEmail