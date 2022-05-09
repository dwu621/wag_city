const { User, Dog, Job } = require('../models')

const CreateJob = async (req, res) => {
    try {
        const newJob = await Job.create(req.body)
        res.send(newJob)
    } catch (error) {
        throw error
    }
}

const GetJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            include: [
                {
                    model: User,
                    as: 'posted_by'
                },
                {
                    model: User,
                    as: 'accepted_by'
                },
                {
                    model: Dog,
                    as: 'dog'
                }
            ]
        })
        res.send(jobs)
    } catch (error) {
        throw error
    }
}

const GetJobDetails = async (req, res) => {
    try {
        const job_id = parseInt(req.params.job_id)
        const job = await Job.findByPk(
            job_id, {
            include: [
                {
                    model: User,
                    as: 'posted_by'
                },
                {
                    model: User,
                    as: 'accepted_by'
                },
                {
                    model: Dog,
                    as: 'dog'
                }
            ]
        })
        res.send(job)
    } catch (error) {
        throw error
    }
}

const UpdateJob = async (res, req) => {
    try {
        const job_id = parseInt(req.params.job_id)
        const updatedJob = await Job.update(req.body, {
            where: { id: job_id },
            returning: true
        })
        res.send(updatedJob)
    } catch (error) {
        throw error
    }
}

const DeleteJob = async (req, res) => {
    try {
        const job_id = parseInt(req.params.job_id)
        await Job.destroy({
          where: { id: job_id }
      })
      res.send({ message: `Deleted job with an id of ${job_id}`})
    } catch (error) {
      throw error
    }
}

module.exports = {
    CreateJob,
    GetJobs,
    GetJobDetails,
    UpdateJob,
    DeleteJob
}