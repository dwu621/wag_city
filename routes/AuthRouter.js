const Router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

Router.post('/login', controller.LogIn)

Router.post('/signup', controller.SignUp)

Router.put('/update/:user_id',
middleware.stripToken,
middleware.verifyToken,
controller.UpdatePassword)

Router.get('/session',
middleware.stripToken,
middleware.verifyToken, 
controller.CheckSession)


module.exports = Router