import { useContext, useEffect, useState } from "react"
import { DataContext } from "../components/DataContext"
import { GetAllJobs, UpdateAcceptJob, UpdateJobComplete } from "../services/JobServices"
import JobCard from "../components/JobCard"
import Row from 'react-bootstrap/Row'


const Job = () => {
    const { user, authenticated } = useContext( DataContext )
    const [ jobs, setJobs ] = useState([])

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

    useEffect(() => {
        handleJobs()
    }, [])

    if (user && user.userType === "Walker" && jobs && authenticated )
    return (
        <div>
            <div>
                <h2>Your Jobs</h2>
           <Row className="justify-content-center">
                {jobs.filter((job)=> job.walkerId === user.id && job.isComplete === false).map((job)=>(
                <JobCard 
                key={job.id}
                title={job.title}
                dogName={job.dog.name}
                description={job.description}
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
                <h2>Available Jobs</h2>

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
      
            
            </div>
           
        </div>
    )
}       

export default Job