const { Dog, User } = require('../models')

const GetDogs = async (req, res) => {
    try {
        const dogs = await Dog.findAll({
        
        })
        res.send(dogs)
    } catch (error) {
        throw error
    }
}

module.exports = {
    GetDogs
}