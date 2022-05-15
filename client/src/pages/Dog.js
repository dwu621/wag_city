import { DataContext } from "../components/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetOwnerDogs } from "../services/UserServices";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { AddDog } from "../services/DogServices";


const Dog = () => {
    const { user, authenticated } = useContext( DataContext )
    const [ownerDogs, setOwnerDogs] = useState()
    const [clicked, setClicked] = useState(false)
    const [formValues, setFormValues] = useState({
        name: "",
        gender: "",
        weight: "",
        breed: "",
        image: "",
        ownerId: ""
    })
    
    const navigate = useNavigate()
    
    const handleOwnerInfo = async (id) => {
        const dogs = await GetOwnerDogs(id)
        setOwnerDogs(dogs)
    }
    
    const handleClick = () => {
        setClicked(!clicked)
    }
    
    const handleSubmit = async (e,) => {
        e.preventDefault()
        await AddDog(formValues)
        setFormValues({
            name: "",
            gender: "",
            weight: "",
            breed: "",
            image: "",
            ownerId: ""
        })
    }

    const handleChange = async (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
    console.log(formValues)
    useEffect(() => {
        if(user) {
            handleOwnerInfo(user.id)
            setFormValues({...formValues, ownerId: user.id})
        }
    }, [user, clicked, formValues])

    return (user && user.userType === "Walker") ? (
        <div>{navigate("../jobs")}</div>
    ) : (user && authenticated && ownerDogs) && (
        <div>
             <Container>
                <Row>
                <h2>{user.firstName}'s Dogs</h2>
                {
                    ownerDogs.map((dog)=>(
                        <Card key={dog.id} style={{ width: '18rem' }}>
                            <Card.Img src={dog.image} />
                        </Card>
                    ))
                }

                </Row>  
                <Button onClick={() => handleClick()} hidden={clicked} >
                    Add Dog
                </Button>
             </Container>

            <Container hidden={!clicked}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Tell us about your new dog</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control 
                        type="text" name="name" 
                        placeholder="Name" 
                        onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="breed">
                        <Form.Control 
                        type="text" 
                        name="breed" 
                        placeholder="Breed" 
                        onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Control 
                        type="text" 
                        name="gender" 
                        placeholder="Gender" 
                        onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="weight">
                        <Form.Control 
                        type="text" 
                        name="weight" 
                        placeholder="Weight(lbs)" 
                        onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Control 
                        type="text" 
                        name="image" 
                        placeholder="Picture" 
                        onChange={handleChange} />
                    </Form.Group>

                    <Button 
                    disabled={
                        !formValues.name || 
                        !formValues.gender || 
                        !formValues.breed ||
                        !formValues.weight ||
                        !formValues.image ||
                        !formValues.ownerId} 
                    type="submit" 
                    onClick={() => handleClick()}>
                            Add Dog
                    </Button>
                     <>     </>   
                    <Button 
                    onClick={() => handleClick()} 
                    variant="outline-primary">
                        Cancel
                    </Button>
                </Form>                
            </Container>
        </div>
        
        
        
       
        
    )
}

export default Dog