import { beforeEach, describe, expect, it } from 'vitest'

import { UserRepositoryInMemory } from '../../../user/repositories/in-memory/user-repository-in-memory'
import { FoodRepositoryInMemory } from '../../repositories/in-memory/food-repository-in-memory'
import { CreateFoodUseCase } from '../create-food/create-food-use-case'
import { CreateUserUseCase } from '../../../user/use-cases/create-user/create-user-use-case'
import { MetricsFoodUseCase } from './metrics-food-use-case'

let userRepositoryInMemory: UserRepositoryInMemory
let foodRepositoryInMemory: FoodRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let createFoodUseCase: CreateFoodUseCase
let metricsFoodUseCase: MetricsFoodUseCase

describe('Metrics food', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    foodRepositoryInMemory = new FoodRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
    metricsFoodUseCase = new MetricsFoodUseCase(foodRepositoryInMemory)
  })
  const userTest = {
    name: 'Sérgio Almeida',
    email: 'sergioalmeidaa00@gmail.com',
    password: '123456',
  }
  const food = {
    name: 'Pizza',
    description: 'day off',
    date: '2023-04-06',
    time: '15:00',
    diet: true,
  }
  it('should be possible to list the metrics', async () => {
    const user = await createUserUseCase.execute(userTest)
    expect(user).toHaveProperty('id')

    await createFoodUseCase.execute({ ...food, userId: user.id })
    await createFoodUseCase.execute({ ...food, userId: user.id })
    await createFoodUseCase.execute({ ...food, userId: user.id })
    await createFoodUseCase.execute({ ...food, userId: user.id, diet: false })
    await createFoodUseCase.execute({ ...food, userId: user.id })

    const resultMetrics = await metricsFoodUseCase.execute({ userId: user.id })

    expect(resultMetrics).toMatchObject({
      amountFood: 5,
      amountFoodDiet: 4,
      amountFoodNotDiet: 1,
      percentageDiet: 80,
      percentageNotDiet: 20,
      maxSequence: 3,
    })

    expect(resultMetrics).toBeTypeOf('object')
  })
})
