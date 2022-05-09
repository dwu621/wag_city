const res = require('express/lib/response')
const { Dog, User } = require('../models')

const CreateDog = async (req,res) => {
    try {
        const newDog = await Dog.create(req.body)
        res.send(newDog) 
    } catch (error) {
        throw error
    }
}

const GetDogs = async (req, res) => {
    try {
        const dogs = await Dog.findAll({
            include: [
                {
                    model: User,
                    as: 'owner'
                }
            ]
        })
        res.send(dogs)
    } catch (error) {
        throw error
    }
}

const GetDogDetails = async (req, res) => {
    try {
        const dog_id = parseInt(req.params.dog_id)
        const dog = await Dog.findByPk(dog_id, {
            include: [
                {
                    model: User,
                    as: 'owner'
                }
            ]
        })
        res.send(dog)
    } catch (error) {
        throw error
    }
}

const UpdateDog = async (req,res) => {
    try {
        const dog_id = parseInt(req.params.dog_id)
        const updatedDog = await Dog.update(req.body, {
            where: { id: dog_id},
            returning:true
        })
        res.send(updatedDog) 
    } catch (error) {
        throw error
    }
}

const DeleteDog = async (req,res) => {
    try {
        const dog_id = parseInt(req.params.dog_id)
        await Dog.destroy({
            where: { id: dog_id},
        })
        res.send({ message: `Deleted dog with an id of ${dog_id}`}) 
    } catch (error) {
        throw error
    }
}

module.exports = {
    CreateDog,
    GetDogs,
    GetDogDetails,
    UpdateDog,
    DeleteDog
}