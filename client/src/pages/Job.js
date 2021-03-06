import { useContext, useEffect, useState } from "react"
import { DataContext } from "../components/DataContext"
import { GetAllJobs, UpdateAcceptJob, UpdateJobComplete, NewJob } from "../services/JobServices"
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
        walkerId: 1,
        dogId: ""
    })

    const handleJobs = async () => {
        const data = await GetAllJobs()
        setJobs(data)
    }
  
    const acceptJob = async (walkerId, jobId) => {
        await UpdateAcceptJob(walkerId, jobId)
        handleJobs()

    }

    const completeJob = async (jobId) => {
        await UpdateJobComplete(jobId)
        handleJobs()

    }

    const handleClick = () => {
        setClicked(!clicked)
       

    }

    const handleDogs = async (id) => {
        const dogs = await GetOwnerDogs(id)
        setOwnerDogs(dogs)
        if (dogs[0]) {
            setFormValues({...formValues, dogId: dogs[0].id})
        }
    }

    const handleChange = async (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await NewJob(formValues)
        await handleJobs()
        setFormValues({
            title: "",
            description: "",
            walkDuration: "",
            isAccepted: false,
            isComplete: false,
            ownerId: "",
            walkerId: 1,
            dogId: ""
        })
    }

    useEffect(() => {
        handleJobs()
        if(user && user.userType === "Owner" && user.id) {
            handleDogs(user.id)
            setFormValues({...formValues, ownerId: user.id})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
   

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
                    posted_by={`${job.posted_by.firstName} ${job.posted_by.lastName.charAt(0)}.`}
                    ownerId={job.posted_by.id}
                    acceptJob={() => acceptJob(user.id, job.id)}
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
                walkDuration={job.walkDuration}
                posted_by={`${job.posted_by.firstName} ${job.posted_by.lastName.charAt(0)}.`}
                ownerId={job.posted_by.id}
                acceptJob= {() => acceptJob(user.id, job.id)}
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
                  posted_by={`${job.posted_by.firstName} ${job.posted_by.lastName.charAt(0)}.`}
                  ownerId={job.posted_by.id}
                  acceptJob={() => acceptJob(user.id, job.id)}
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
                <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label>New Job</Form.Label>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="dogId">
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

                <Form.Group className="mb-3" controlId="title">
                    <Form.Control 
                        type="text" name="title" 
                        placeholder="Job Title" 
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Control 
                        type="text" name="description" 
                        placeholder="Short Description" 
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="walkDuration">
                    <Form.Control 
                        type="integer" name="walkDuration" 
                        placeholder="Walk Time(minutes)" 
                        onChange={handleChange} />
                </Form.Group>

                <Button 
                    disabled={
                        !formValues.title ||
                        !formValues.description ||
                        !formValues.walkDuration ||
                        !formValues.dogId ||
                        !formValues.ownerId
                    }
                    type="submit"
                    onClick={handleClick}>
                    Post Job
                    </Button>
                <>   </>
                <Button 
                    onClick={handleClick} 
                    variant="outline-primary">
                    Cancel
                    </Button>
                </Form>
           
            </Container>

           
            <Container hidden={clicked}>
            <Button onClick={handleClick} hidden={clicked}>New Job</Button>
            <Row className="justify-content-center">
               
                {jobs.filter((job)=> job.ownerId === user.id).length > 0 ? <h2 style={ {textAlign: 'center'} }>Your Jobs</h2> : <h2 style={ {textAlign: 'center'} }>No Jobs to display</h2>}
           
                {jobs.filter((job)=> job.ownerId === user.id).map((job)=>(
                <Card key={job.id} style={{ width: '18rem' }} >
                <Card.Img variant="top" src={job.dog.image}  />
                <Card.Header >
                    <Card.Title>{job.dog.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Title: {job.title}</Card.Title>
                    <Card.Text>Description: {job.description}</Card.Text>
                    <Card.Text>Walk Time: {job.walkDuration} minutes</Card.Text>
                    
                    <Card.Text hidden={job.isAccepted || job.isComplete}>Waiting for Walker...</Card.Text>

                    <Card.Text hidden={!job.isAccepted || job.isComplete}>Accepted by: <Link to={`/walker/details/${job.accepted_by.id}`}>{job.accepted_by.firstName} {job.accepted_by.lastName.charAt(0)}.</Link></Card.Text>
                    
                    <Card.Text hidden={!job.isComplete}>Completed by: <Link to={`/walker/details/${job.accepted_by.id}`}>{job.accepted_by.firstName} {job.accepted_by.lastName.charAt(0)}.</Link></Card.Text>


                </Card.Body>    
                </Card>
                ))}
                </Row>
                    
        </Container>
        </div>
        
    )
}       

export default Job