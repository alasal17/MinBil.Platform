import {useState} from 'react'
import './forms.css'
import {auth} from "../../firebase";
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'



function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
  
    const validatePassword = () => {
      let isValid = true
      if (password !== '' && confirmPassword !== ''){
        if (password !== confirmPassword) {
          isValid = false
          setError('Passwords does not match')
        }
      }
      return isValid
    }
  
    const register = e => {
      e.preventDefault()
      setError('')
      if(validatePassword()) {
        // Create a new user with email and password using firebase
          createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            sendEmailVerification(auth.currentUser)   
            .then(() => {
              
              // navigate('/verify-email')
              navigate('/login')
            }).catch((err) => alert(err.message))
          })
          .catch(err => setError(err.message))
      }
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  
    return (
      <div className="login">
        <div className='auth'>
          <h1>Register</h1>
          {error && <div className='auth__error'>{error}</div>}
          <form onSubmit={register} name='registration_form'>
            <input 
              type='email' 
              value={email}
              placeholder="Enter your email"
              required
              onChange={e => setEmail(e.target.value)}/>
  
            <input 
              type='password'
              value={password} 
              required
              placeholder='Enter your password'
              onChange={e => setPassword(e.target.value)}/>
  
              <input 
              type='password'
              value={confirmPassword} 
              required
              placeholder='Confirm password'
              onChange={e => setConfirmPassword(e.target.value)}/>
  
            <button type='submit'>Register</button>
          </form>
          <div className="line"></div>
          <span>
          Har du allerede en konto? 
            <Link to='/login'>
            <br></br>
            <button style={{backgroundColor: 'rgb(53, 146, 34)'}}>
            Login
            </button>
              
              </Link>
          </span>
        </div>
      </div>
    )
  }
  
  export default Register