import { DataContext } from "../components/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetOwnerDogs } from "../services/UserServices";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";


const Dog = () => {
    const { user, authenticated } = useContext( DataContext )
    const [ownerDogs, setOwnerDogs] = useState()
    const [clicked, setClicked] = useState(false)
    
    const navigate = useNavigate()
    
    const handleOwnerInfo = async (id) => {
        const dogs = await GetOwnerDogs(id)
        setOwnerDogs(dogs)
    }
    
    const handleClick = () => {
        setClicked(!clicked)
    }
    
    const handleAddDog = async (e, id) => {
        e.preventDefault()
        console.log(`adding dog for owner ${id}`)
    }

    console.log(clicked)

    useEffect(() => {
        if(user) {
            handleOwnerInfo(user.id)
        }
    }, [user])

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
                <Form onSubmit={(e) => handleAddDog(e, user.id)}>
                


                <Button type="submit" onClick={() => handleClick()} >Add Dog</Button>
                 <>     </>   
                 <Button onClick={() => handleClick()} variant="outline-primary">Cancel</Button>
                </Form>                
       
            </Container>
        </div>
        
        
        
       
        
    )
}

export default Dog