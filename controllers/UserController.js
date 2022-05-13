const { User, Dog, Job } = require('../models')

const GetAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.send(users)
    } catch (error) {
        throw error
    }
}

const GetUser = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id)
        const user = await User.findByPk(user_id)
        res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
                bio: user.bio,
                zipcode: user.zipcode,
                image: user.image
        })
    } catch (error) {
        error
    }
}

const GetOwners = async (req, res) => {
    try {
        const owners = await User.findAll({
            where: { userType:'Owner' },
            include: [
                {
                    model: Dog,
                    as: 'dogs',
                },
                {
                    model: Job,
                    as: 'job_posted'
                }
            ]
        })
        res.send(owners)
    } catch (error) {
        throw error
    }
}

const GetOwnerDetails = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id)
        const owner = await User.findOne({
            where: { 
                userType:'Owner',
                id: user_id 
            },
            include: [
                {
                    model: Dog,
                    as: 'dogs',
                },
                {
                    model: Job,
                    as: 'job_posted'
                }
            ]
            })
        res.send(owner)
    } catch (error) {
        throw error
    }
}

const GetWalkers = async (req, res) => {
    try {
        const walkers = await User.findAll({
            where: { userType:'Walker' },
            include: [
                {
                    model: Job,
                    as: 'job_accepted'
                }
            ]
        })
        res.send(walkers)
    } catch (error) {
        throw error
    }
}

const GetWalkerDetails = async (req, res) => {
    try {
        const walker = await User.findOne({
                where: { 
                    userType:'Walker',
                    id: req.params.user_id 
                },
                include: [
                    {
                        model: Job,
                        as: 'job_accepted'
                    }
                ]
        })
        res.send(walker)
    } catch (error) {
        throw error
    }
}

const UpdateUser = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id)
        const updatedUser = await User.update(req.body, {
            where: { id: user_id },
            returning: true
        })
        res.send({
            id: updatedUser[1][0].id,
            firstName: updatedUser[1][0].firstName,
            lastName: updatedUser[1][0].lastName,
            email:updatedUser[1][0].email,
            userType:updatedUser[1][0].userType,
            bio:updatedUser[1][0].bio,
            zipcode:updatedUser[1][0].zipcode,
            image:updatedUser[1][0].image
        })
    } catch (error) {
        throw error
    }
}

const DeleteUser = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id)
        await User.destroy({
          where: { id: user_id }
      })
      res.send({ message: `Deleted user with an id of ${user_id}`})
    } catch (error) {
      throw error
    }
}

module.exports = {
    GetAllUsers,
    GetUser,
    GetOwners,
    GetWalkers,
    GetOwnerDetails,
    GetWalkerDetails,
    UpdateUser,
    DeleteUser,
    
}