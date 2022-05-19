import { useContext, useState } from "react"
import { DataContext } from "../components/DataContext"
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'


const Login = () => {
    const { setUser, toggleAuthenticated } = useContext( DataContext )
    const [ formValues, setFormValues ] = useState({ email: '', password: '' })
    
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const payload = await SignInUser(formValues)
      setFormValues({ email: '', password: '' })
      setUser(payload)
      toggleAuthenticated(true)
      navigate('/jobs')
      
    }
    return (
      <div className="bg">
        <div className="form-wrapper">
          <div className="login-form">
            <Form onSubmit={handleSubmit}>
              <h2>Log in</h2>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                  <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                  </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange}/>
              </Form.Group>
              <Form.Group>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={!formValues.email || !formValues.password}
                  >
                  Submit
                </Button>
              </Form.Group>
              <Form.Group>
                <Form.Text style={{textAlign:'right'}}muted>
                </Form.Text>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Text>
                  Don't have an account? <a href="./signup">Register</a>
                  </Form.Text>
              </Form.Group>
              
            </Form>
          </div>
        </div>
      </div>
       
      


           
 
    )
}

export default Login