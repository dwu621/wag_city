const Router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

Router.post('/login', controller.LogIn)

Router.post('/signup', controller.SignUp)

Router.post('/update/:user_id', controller.UpdatePassword)

Router.get('/session', controller.CheckSession)


module.exports = Router