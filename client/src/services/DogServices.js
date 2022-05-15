import Client from "./api";

export const AddDog = async (data) => {
    try {
        const res = await Client.post(`/api/dog`, data)
        console.log(res)
    } catch (error) {
        throw error
    }
}