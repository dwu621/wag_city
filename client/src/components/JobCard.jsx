import Card from 'react-bootstrap/Card'

import Button from 'react-bootstrap/esm/Button'


const JobCard = (props) => {
    return (
       
        <Card style={{ width: '18rem' }} >
            <Card.Img variant="top" src={props.image}  />
            <Card.Header >
                <Card.Title>{props.dogName}</Card.Title>
                <Card.Text muted>posted by: {props.posted_by}</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Card.Text>{props.walkDuration} minutes</Card.Text>
                
                <Button onClick={() => props.acceptJob()} hidden={props.isAccepted} variant="primary">Accept</Button>
                <Button onClick={() => props.completeJob()} hidden={!props.isAccepted || props.isComplete} variant="primary">Mark Completed</Button>
            </Card.Body>    
        </Card>
     
        
    )
}

export default JobCard