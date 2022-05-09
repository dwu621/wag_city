const Router = require('express').Router()
const controller = require('../controllers/DogController')

Router.post('/', controller.CreateDog)
Router.get('/', controller.GetDogs)
Router.get('/:dog_id', controller.GetDogDetails)
Router.put('/:dog_id', controller.UpdateDog)
Router.delete('/:dog_id', controller.DeleteDog)



module.exports = Router