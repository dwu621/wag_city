import { useContext, useEffect, useState } from "react"
import { DataContext } from "../components/DataContext"
import { GetAllJobs, UpdateAcceptJob, UpdateJobComplete } from "../services/JobServices"
import { GetOwnerDogs } from "../services/UserServices"
import JobCard from "../components/JobCard"
import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/esm/Container"
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/Form"

const Job = () => {
    const { user, authenticated } = useContext( DataContext )
    const [ jobs, setJobs ] = useState([])
    const [ ownerDogs, setOwnerDogs ] = useState()
    const [ clicked, setClicked ] = useState(false)
    const [ formValues, setFormValues ] = useState({
        title: "",
        description: "",
        walkDuration: "",
        isAccepted: false,
        isComplete: false,
        ownerId: "",
        dogId: ""
    })

    const handleJobs = async () => {
        const data = await GetAllJobs()
        console.log(data)
        setJobs(data)
    }
  
    const acceptJob = async (walkerId, jobId) => {
        await UpdateAcceptJob(walkerId, jobId)
        console.log('accept job', walkerId, jobId)
        handleJobs()

    }

    const completeJob = async (jobId) => {
        await UpdateJobComplete(jobId)
        console.log('markcomplete', jobId)
        handleJobs()

    }

    const handleClick = () => {
        setClicked(!clicked)
        console.log("clicked")

    }

    const handleDogs = async (id) => {
        const dogs = await GetOwnerDogs(id)
        setOwnerDogs(dogs)
    }

    const handleChange = async (e) => {
        console.log(e.target.name ,e.target.value)
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        handleJobs()
        if(user && user.userType === "Owner") {
            handleDogs(user.id)
        }
    }, [user])

    console.log(formValues)

    if (user && user.userType === "Walker" && jobs && authenticated)
    return (
        <div>
            <div>
              
                <Row className="justify-content-center">
                    {jobs.filter((job)=> job.walkerId === user.id && job.isComplete === false).length > 0 &&  <h2 style={ {textAlign: 'center'} }>Your Jobs</h2>}
                   
                    {jobs.filter((job)=> job.walkerId === user.id && job.isComplete === false).map((job)=>(
                    <JobCard 
                    key={job.id}
                    title={job.title}
                    dogName={job.dog.name}
                    description={job.description}
                    walkDuration={job.walkDuration}
                    image={job.dog.image}
                    isAccepted={job.isAccepted}
                    isComplete={job.isComplete}
                    posted_by={job.posted_by.firstName}
                    acceptJob={() => acceptJob(user.id, job.dogId)}
                    completeJob={() => completeJob(job.id)} 
                    />
                    ))}
                   
                </Row>
             
            </div>
            <div>
                
                <Row className="justify-content-center">
                {jobs.filter((job)=> !job.isAccepted && job.walkerId !== user.id).length > 0 && <h2 style={ {textAlign: 'center'} } >Available Jobs</h2>}
                {jobs.filter((job)=> !job.isAccepted && job.walkerId !== user.id).map((job)=>(
                <JobCard 
                key={job.id}
                title={job.title}
                dogName={job.dog.name}
                description={job.description}
                image={job.dog.image}
                isAccepted={job.isAccepted}
                isComplete={job.isComplete}
                posted_by={job.posted_by.firstName}
                acceptJob= {() => acceptJob(user.id, job.dogId)}
                />
                 ))}
                </Row>
            
            </div>

            <div>
              
              <Row className="justify-content-center">
                  {jobs.filter((job)=> job.walkerId === user.id && job.isComplete === true).length > 0 && 
                  <h2 style={ {textAlign: 'center'} }>Completed Jobs</h2>}
                  {jobs.filter((job)=> job.walkerId === user.id && job.isComplete === true).map((job)=>(
                  <JobCard 
                  key={job.id}
                  title={job.title}
                  dogName={job.dog.name}
                  description={job.description}
                  walkDuration={job.walkDuration}
                  image={job.dog.image}
                  isAccepted={job.isAccepted}
                  isComplete={job.isComplete}
                  posted_by={job.posted_by.firstName}
                  acceptJob={() => acceptJob(user.id, job.dogId)}
                  completeJob={() => completeJob(job.id)} 
                  />
                  ))}
              </Row>
           
          </div>
           
        </div>
    )
    else if (user && user.userType === "Owner" && jobs && authenticated && ownerDogs) 
    return (
        <div>
            
            <Container hidden={!clicked}>
                <Form>

                <Form.Group>
                        <Form.Label>New Job</Form.Label>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="name">
                    <Form.Select name="dogId" onChange={handleChange} >
                        {
                        ownerDogs.map((dog)=>(
                            <option 
                            key={dog.id}
                            value={dog.id}
                            >
                                {dog.name}
                            </option>
                        ))
                        }
                        
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Control 
                        type="text" name="name" 
                        placeholder="Name" 
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Control 
                        type="text" name="name" 
                        placeholder="Name" 
                        onChange={handleChange} />
                </Form.Group>
                
                
                
                <Button onClick={handleClick}>Post Job</Button>
                </Form>
           
            </Container>

           
            <Container hidden={clicked}>
            
            <Row className="justify-content-center">
               
                {jobs.filter((job)=> job.ownerId === user.id).length > 0 ? <h2 style={ {textAlign: 'center'} }>Your Jobs</h2> : <h2 style={ {textAlign: 'center'} }>No Jobs to display</h2>}
                <Button onClick={handleClick} hidden={clicked}>New Job</Button>
                {jobs.filter((job)=> job.ownerId === user.id).map((job)=>(
                <Card key={job.id} style={{ width: '18rem' }} >
                <Card.Img variant="top" src={job.dog.image}  />
                <Card.Header >
                    <Card.Title>{job.dog.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <Card.Text>{job.walkDuration} minutes</Card.Text>
                    <Card.Text hidden={!job.isAccepted || job.isComplete}>Accepted by <Link to={`/walker/details/${job.accepted_by.id}`}>{job.accepted_by.firstName} {job.accepted_by.lastName.charAt(0)}.</Link></Card.Text>
                    <Card.Text hidden={!job.isComplete}>Completed by <Link to={`/walker/details/${job.accepted_by.id}`}>{job.accepted_by.firstName} {job.accepted_by.lastName.charAt(0)}.</Link></Card.Text>
                </Card.Body>    
                </Card>
                ))}
                </Row>
                    
        </Container>
        </div>
        
    )
}       

export default Job