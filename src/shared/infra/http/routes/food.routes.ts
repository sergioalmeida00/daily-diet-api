import { Router } from 'express'

import { ensureAuth } from '../middleware/ensure-auth'
import { FoodRepositoryInMemory } from '../../../../modules/food/repositories/in-memory/food-repository-in-memory'
import { CreateFoodUseCase } from '../../../../modules/food/use-cases/create-food/create-food-use-case'
import { CreateFoodController } from '../../../../modules/food/use-cases/create-food/create-food-controller'
import { UpdateFoodUseCase } from '../../../../modules/food/use-cases/update-food/update-food-use-case'
import { UpdateFoodController } from '../../../../modules/food/use-cases/update-food/update-food-controller'

const routeFood = Router()

// REPOSITORY IN MEMORY FOOD
const foodRepositoryInMemory = new FoodRepositoryInMemory()

// CREATE FOOD
const createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
const createFoodController = new CreateFoodController(createFoodUseCase)

// UPDATE FOOD
const updateFoodUseCase = new UpdateFoodUseCase(foodRepositoryInMemory)
const updateFoodController = new UpdateFoodController(updateFoodUseCase)

// ENDPOINTS
routeFood.post('/create', ensureAuth, (request, response) => {
  createFoodController.handle(request, response)
})

routeFood.put('/update/:id', ensureAuth, (request, response) => {
  updateFoodController.handle(request, response)
})

export { routeFood }
