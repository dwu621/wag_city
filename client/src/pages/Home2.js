
import { useContext, useState, useEffect } from "react"
import { DataContext } from "../components/DataContext"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Home2 = () => {
    const { user, authenticated } = useContext( DataContext )
    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        console.log(formValues)
        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
    }
    return (user && authenticated)? (
        <div>
            <Form onSubmit={handleSubmit}>
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
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </div>
    ) : (
        <div>no home2</div>
    )
}

export default Home2