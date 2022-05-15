import { DataContext } from "../components/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetOwnerDogs } from "../services/UserServices";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card"
import CardHeader from "react-bootstrap/esm/CardHeader";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";


const Dog = () => {
    const { user, authenticated } = useContext( DataContext )
    const [ownerDogs, setOwnerDogs] = useState([])
    
    const navigate = useNavigate()
    
    const handleOwnerInfo = async (id) => {
        const dogs = await GetOwnerDogs(id)
        setOwnerDogs(dogs)
    }

    useEffect(() => {
        if(user) {
            handleOwnerInfo(user.id)
        }
    }, [user])

    return (user && user.userType === "Walker") ? (
        <div>{navigate("../jobs")}</div>
    ) : (user && authenticated && ownerDogs) && (
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
          <Button>
              Add New Dog
          </Button>
        </Container>
        
    )
}

export default Dog