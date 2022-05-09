const Router = require('express').Router()
const controller = require('../controllers/DogController')

Router.get('/', controller.GetDogs)

module.exports = Router