const Router = require('express').Router()
const controller = require('../controllers/DogController')

Router.post('/',
middleware.stripToken,
middleware.verifyToken, 
controller.CreateDog)

Router.get('/',
middleware.stripToken,
middleware.verifyToken,
controller.GetDogs)

Router.get('/:dog_id',
middleware.stripToken,
middleware.verifyToken,
controller.GetDogDetails)

Router.put('/:dog_id',
middleware.stripToken,
middleware.verifyToken, 
controller.UpdateDog)

Router.delete('/:dog_id', 
middleware.stripToken,
middleware.verifyToken,
controller.DeleteDog)


module.exports = Router