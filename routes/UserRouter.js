const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.get('/', 
middleware.stripToken,
middleware.verifyToken,
controller.GetAllUsers)

Router.get('/owner', 
middleware.stripToken,
middleware.verifyToken,
controller.GetOwners)

Router.get('/owner/:user_id', 
middleware.stripToken,
middleware.verifyToken,
controller.GetOwnerDetails)

Router.get('/walker', 
middleware.stripToken,
middleware.verifyToken,
controller.GetWalkers)

Router.get('/walker/:user_id', 
middleware.stripToken,
middleware.verifyToken,
controller.GetWalkerDetails)

Router.put('/:user_id',
middleware.stripToken,
middleware.verifyToken,
controller.UpdateUser)

Router.delete('/:user_id',
middleware.stripToken,
middleware.verifyToken,
controller.DeleteUser)


module.exports = Router