import { Router } from 'express'

import { FoodRepositoryInMemory } from '../../../../modules/food/repositories/in-memory/food-repository-in-memory'
import { CreateFoodUseCase } from '../../../../modules/food/use-cases/create-food/create-food-use-case'
import { CreateFoodController } from '../../../../modules/food/use-cases/create-food/create-food-controller'
import { ensureAuth } from '../middleware/ensure-auth'

const routeFood = Router()

// REPOSITORY IN MEMORY FOOD
const foodRepositoryInMemory = new FoodRepositoryInMemory()

// CREATE FOOD
const createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
const createFoodController = new CreateFoodController(createFoodUseCase)

// ENDPOINTS
routeFood.post('/create', ensureAuth, (request, response) => {
  createFoodController.handle(request, response)
})

export { routeFood }
