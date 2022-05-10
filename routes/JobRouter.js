const Router = require('express').Router()
const controller = require('../controllers/JobController')
const middleware = require('../middleware')

Router.post('/', 
middleware.stripToken,
middleware.verifyToken,
controller.CreateJob)

Router.get('/', 
middleware.stripToken,
middleware.verifyToken,
controller.GetJobs)

Router.get('/:job_id', 
middleware.stripToken,
middleware.verifyToken,
controller.GetJobDetails)

Router.put('/:job_id', 
middleware.stripToken,
middleware.verifyToken,
controller.UpdateJob)

Router.delete('/:job_id', 
middleware.stripToken,
middleware.verifyToken,
controller.DeleteJob)


module.exports = Router