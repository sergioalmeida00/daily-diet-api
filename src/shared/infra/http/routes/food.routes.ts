import { Router } from 'express'

import { ensureAuth } from '../middleware/ensure-auth'
import { FoodRepositoryInMemory } from '../../../../modules/food/repositories/in-memory/food-repository-in-memory'
import { CreateFoodUseCase } from '../../../../modules/food/use-cases/create-food/create-food-use-case'
import { CreateFoodController } from '../../../../modules/food/use-cases/create-food/create-food-controller'
import { UpdateFoodUseCase } from '../../../../modules/food/use-cases/update-food/update-food-use-case'
import { UpdateFoodController } from '../../../../modules/food/use-cases/update-food/update-food-controller'
import { ListAllFoodsUseCase } from '../../../../modules/food/use-cases/list-all-foods/list-all-foods--use-case'
import { ListAllFoodsController } from '../../../../modules/food/use-cases/list-all-foods/list-all-foods-controller'
import { DeleteFoodUseCase } from '../../../../modules/food/use-cases/delete-food/delete-food-use-case'
import { DeleteFoodController } from '../../../../modules/food/use-cases/delete-food/delete-food-controller'
import { FindIdFoodUseCase } from '../../../../modules/food/use-cases/find-id-food/find-id-food-use-case'
import { FindIdFoodController } from '../../../../modules/food/use-cases/find-id-food/find-id-food-controller'
import { MetricsFoodUseCase } from '../../../../modules/food/use-cases/metrics-food/metrics-food-use-case'
import { MetricsFoodController } from '../../../../modules/food/use-cases/metrics-food/metrics-food-controller'

const routeFood = Router()

// REPOSITORY IN MEMORY FOOD
const foodRepositoryInMemory = new FoodRepositoryInMemory()

// CREATE FOOD
const createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
const createFoodController = new CreateFoodController(createFoodUseCase)

// UPDATE FOOD
const updateFoodUseCase = new UpdateFoodUseCase(foodRepositoryInMemory)
const updateFoodController = new UpdateFoodController(updateFoodUseCase)

// LIST ALL FOODS
const listAllFoodsUseCase = new ListAllFoodsUseCase(foodRepositoryInMemory)
const listAllFoodsController = new ListAllFoodsController(listAllFoodsUseCase)

// DELETE FOOD
const deleteFoodUseCase = new DeleteFoodUseCase(foodRepositoryInMemory)
const deleteFoodController = new DeleteFoodController(deleteFoodUseCase)

// FIND FOOD BY ID
const findIdFoodUseCase = new FindIdFoodUseCase(foodRepositoryInMemory)
const findIdFoodController = new FindIdFoodController(findIdFoodUseCase)

// METRICS FOOD USER
const metricsFoodUseCase = new MetricsFoodUseCase(foodRepositoryInMemory)
const metricsFoodController = new MetricsFoodController(metricsFoodUseCase)

// ENDPOINTS
routeFood.post('/create', ensureAuth, (request, response) => {
  createFoodController.handle(request, response)
})

routeFood.put('/update/:id', ensureAuth, (request, response) => {
  updateFoodController.handle(request, response)
})

routeFood.get('/', ensureAuth, (request, response) => {
  listAllFoodsController.handle(request, response)
})

routeFood.delete('/:id', ensureAuth, (request, response) => {
  deleteFoodController.handle(request, response)
})

routeFood.get('/:id', ensureAuth, (request, response) => {
  findIdFoodController.handle(request, response)
})

routeFood.get('/metrics/food', ensureAuth, (request, response) => {
  metricsFoodController.handle(request, response)
})

export { routeFood }
