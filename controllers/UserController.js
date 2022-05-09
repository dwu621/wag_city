const { User, Dog, Job } = require('../models')

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

module.exports = {
    GetOwners,
    GetWalkers
}