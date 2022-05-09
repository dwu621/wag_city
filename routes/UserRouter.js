const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.get('/owner', controller.GetOwners)
Router.get('/owner/:user_id', controller.GetOwnerDetails)
Router.get('/walker', controller.GetWalkers)
Router.get('/walker/:user_id', controller.GetWalkerDetails)
Router.put('/:user_id',controller.UpdateUser)
Router.delete('/:user_id',controller.DeleteUser)


module.exports = Router