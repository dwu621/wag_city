import { useContext, useEffect, useState } from 'react'
import { DataContext } from "../components/DataContext"
import { UpdateUser, GetUserInfo, DeleteUser } from '../services/UserServices'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import './Login.css'


const Profile = () => {
    const { user, authenticated, handleLogOut } = useContext( DataContext )

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        zipcode: '',
        image: '',
    })
    
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e, id) => {
        e.preventDefault()
        await UpdateUser(formValues, id)
        await handleLogOut()
    }
 
    const handleDelete = async (e, id) => {
        e.preventDefault()
        await DeleteUser(id)
        await handleLogOut()
    }

    const handleUserInfo = async (id) => {
        const userInfo = await GetUserInfo(id)
        setFormValues(userInfo)
    }

    useEffect(()=> {
        if(user) {
            handleUserInfo(user.id)
        }
    }, [user])

    return (user && authenticated) ? (
        <div className="bg">
            <div className="form-wrapper">
                 <div className="login-form">
                    <Form onSubmit={(e)=>{handleSubmit(e, user.id)}}>
                        <h2>Edit Profile</h2>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Control 
                            type="text" 
                            name="firstName" 
                            placeholder="First Name"
                            onChange={handleChange} defaultValue={formValues.firstName}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Control 
                            type="text" 
                            name="lastName" 
                            placeholder="Last Name" 
                            onChange={handleChange}
                            defaultValue={formValues.lastName} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control 
                            type="email" 
                            name="email" 
                            placeholder="Enter email" 
                            onChange={handleChange} 
                            defaultValue={formValues.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="zipcode">
                            <Form.Control 
                            type="integer" 
                            name="zipcode" 
                            placeholder="Zip Code" 
                            onChange={handleChange} 
                            defaultValue={formValues.zipcode} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Control 
                            type="text" 
                            name="image" 
                            placeholder="Add Picture" 
                            onChange={handleChange}
                            defaultValue={formValues.image}
                             />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bio">
                            <Form.Control 
                            type="text" 
                            name="bio" 
                            placeholder="Short bio" 
                            onChange={handleChange}
                            defaultValue={formValues.bio}
                            />
                        </Form.Group>
               
                        <Stack gap={2} className="col-md mx-auto">
                            <Button variant="primary"
                              type="submit"
                              >Save changes</Button>
                            <Button 
                              variant="outline-primary"
                              onClick={(e)=>{handleDelete(e, user.id)}}
                            >Delete Profile</Button>
                        </Stack>

                        
                        
                    </Form>
                </div>
            </div>
        </div>
    ) : (<div>not logged in</div>)
}

export default Profile