import Client from "./api";

export const AddDog = async (data) => {
    try {
        await Client.post(`/api/dog`, data)
    } catch (error) {
        throw error
    }
}