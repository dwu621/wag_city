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
        const res  = await Client.put(`/api/job/${jobId}`, { walkerId: walkerId, isAccepted: true })
       console.log(res)
    } catch (error) {
        throw error
    }
}

export const UpdateJobComplete = async (jobId) => {
    try {
        const res = await Client.put(`/api/job/${jobId}`, { isComplete: true })
        console.log(res)
    } catch (error) {
        throw error
    }
}

export const NewJob = async (data) => {
    try {
        const res = await Client.post(`/api/job`, data)
        console.log(res)
    } catch (error) {
        throw error
    }
}