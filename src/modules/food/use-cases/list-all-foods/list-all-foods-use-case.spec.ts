import { beforeEach, describe, expect, it } from 'vitest'

import { UserRepositoryInMemory } from '../../../user/repositories/in-memory/user-repository-in-memory'
import { FoodRepositoryInMemory } from '../../repositories/in-memory/food-repository-in-memory'
import { CreateUserUseCase } from '../../../user/use-cases/create-user/create-user-use-case'
import { ListAllFoodsUseCase } from './list-all-foods--use-case'
import { CreateFoodUseCase } from '../create-food/create-food-use-case'

let userRepositoryInMemory: UserRepositoryInMemory
let foodRepositoryInMemory: FoodRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let createFoodUseCase: CreateFoodUseCase
let listAllFoodsUseCase: ListAllFoodsUseCase

describe('List all Foods', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    foodRepositoryInMemory = new FoodRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
    listAllFoodsUseCase = new ListAllFoodsUseCase(foodRepositoryInMemory)
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

  it('it should be possible to list all the food', async () => {
    const user = await createUserUseCase.execute(userTest)
    expect(user).toHaveProperty('id')

    await createFoodUseCase.execute({ ...food, userId: user.id })
    await createFoodUseCase.execute({ ...food, userId: user.id })
    await createFoodUseCase.execute({ ...food, userId: user.id })

    const listFoods = await listAllFoodsUseCase.execute(user.id)

    expect(listFoods).toHaveLength(3)
  })
})
