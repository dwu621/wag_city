const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.get('/owner', controller.GetOwners)
Router.get('/walker', controller.GetWalkers)

module.exports = Router