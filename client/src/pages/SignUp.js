import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

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
        <div className="signin col">
        <div className="card-overlay centered">
          <form className="col" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                onChange={handleChange}
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formValues.firstName}
                required
              />
            </div>
            <div className="input-wrapper">
          
              <input
                onChange={handleChange}
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formValues.lastName}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formValues.email}
                required
              />
            </div>
            <div className="input-wrapper">
          
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder='Password'
                value={formValues.password}
                required
              />
            </div>
            <div className="input-wrapper">
        
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={formValues.confirmPassword}
                required
              />
            </div>
            <div className="input-wrapper">
           
              <input
                onChange={handleChange}
                type="integer"
                name="zipcode"
                placeholder='Zip Code'
                value={formValues.zipcode}
                required
              />
            </div>
            <div className="input-wrapper">
             
              <input
                onChange={handleChange}
                type="text"
                name="image"
                placeholder='Add Picture'
                value={formValues.image}
                required
              />
            </div>
            <div className="input-wrapper">
             
             <input
               onChange={handleChange}
               type="text"
               name="bio"
               placeholder='Short bio'
               value={formValues.bio}
               required
             />
           </div>
            <div className="input-wrapper">
              <label htmlFor="userType">Owner</label>
              <input
                onChange={handleChange}
                type="radio"
                name="userType"
                value='Owner'
                required
              />
              <label htmlFor="userType">Walker</label>
              <input
                onChange={handleChange}
                type="radio"
                name="userType"
                value='Walker'
                required
              />
            </div>
            <button
              disabled={
                !formValues.email ||
                (!formValues.password &&
                  formValues.confirmPassword === formValues.password)
              }
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    )
}

export default SignUp