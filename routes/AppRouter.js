const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const DogRouter = require('./DogRouter')
const JobRouter = require('./JobRouter')

Router.use('/user', UserRouter)
Router.use('/dog', DogRouter)
Router.use('/job', JobRouter)

module.exports = Router