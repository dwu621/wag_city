import Client from './api'

export const UpdateUser = async (data, id) => {
    try {
        const res = await Client.put(`/api/user/${id}`, data)
        return res.data
    } catch (error) {
        throw error
    }
}

export const GetUserInfo = async (id) => {
    try {
        const res = await Client.get(`/api/user/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const DeleteUser = async (id) => {
    try {
        const res = await Client.delete(`api/user/${id}`)
        console.log(res)
        return res
    } catch (error) {
        throw error
    }
}