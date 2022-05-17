import Client from './api'

export const GetAllJobs = async () => {
    try {
        const res = await Client.get(`/api/job`) 
        return res.data
    } catch (error) {
        throw error
    }
}

export const UpdateAcceptJob = async (walkerId, jobId) => {
    try {
        await Client.put(`/api/job/${jobId}`, { walkerId: walkerId, isAccepted: true })
        
    } catch (error) {
        throw error
    }
}

export const UpdateJobComplete = async (jobId) => {
    try {
      await Client.put(`/api/job/${jobId}`, { isComplete: true })
      
    } catch (error) {
        throw error
    }
}

export const NewJob = async (data) => {
    try {
        await Client.post(`/api/job`, data)
   
    } catch (error) {
        throw error
    }
}