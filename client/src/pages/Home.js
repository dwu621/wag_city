import { useContext } from "react"
import { DataContext } from "../components/DataContext"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import "./Home.css"


const Home = () => {
    const navigate = useNavigate() 

    const { user, authenticated } = useContext( DataContext )

    return (user && authenticated) ? (
        <div>{navigate('/jobs')}</div>
    ) : (
        <Container className="heading">
            <Row>
                <Col className="lg-6 get-started">
                    <h1>
                        Meet new dog walkers that love to make your dog's tail wag!
                    </h1>
                    <Button className="navigate-button" onClick={() => {navigate("/signup")}}>Get Started</Button>

                </Col>
                <Col>
                    <img className="dog" src="https://placedog.net/640?id=220" alt="dog"></img>
                </Col>
            </Row>
        </Container>
    )
}

export default Home