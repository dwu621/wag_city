import { useState } from "react"
import { RegisterUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'

const SignUp = () => {
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        zipcode: '',
        image: '',
        userType: ''
    })
   

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        console.log(formValues)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await RegisterUser(formValues)
    
        setFormValues({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            bio: '',
            zipcode: '',
            image: '',
            userType: ''
        })
    
        navigate('/login')
    }

    return (
        <div className="bg">
            <div className="form-wrapper">
                 <div className="login-form">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Control type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Control type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="zipcode">
                            <Form.Control type="integer" name="zipcode" placeholder="Zip Code" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Control type="text" name="image" placeholder="Add Picture" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bio">
                            <Form.Control type="text" name="bio" placeholder="Short bio" onChange={handleChange} />
                        </Form.Group>

                       

                            <Form.Check
                                type='radio'
                                name="userType"
                                value="Owner"
                                label='Owner'
                                onChange={handleChange}
                                required
                            />

                            <Form.Check 
                                type='radio'
                                name="userType"
                                value="Walker"
                                label='Walker'
                                onChange={handleChange}
                                required
                            />
                           
                 
                        <Button
                            variant="primary" 
                            type="submit"
                            disabled={
                                !formValues.email ||
                                (!formValues.password &&
                                  formValues.confirmPassword === formValues.password)
                              }
                        >Sign Up</Button>
                        
                    </Form>
                </div>
            </div>
        </div>
    )



}

export default SignUp