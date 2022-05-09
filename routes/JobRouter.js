const Router = require('express').Router()
const controller = require('../controllers/JobController')

Router.post('/', controller.CreateJob)
Router.get('/', controller.GetJobs)
Router.get('/:job_id', controller.GetJobDetails)
Router.put('/:job_id', controller.UpdateJob)
Router.delete('/:job_id', controller.DeleteJob)


module.exports = Router