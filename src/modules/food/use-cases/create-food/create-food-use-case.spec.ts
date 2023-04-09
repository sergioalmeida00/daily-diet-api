import { beforeEach, describe, expect, it } from 'vitest'
import { FoodRepositoryInMemory } from '../../repositories/in-memory/food-repository-in-memory'
import { UserRepositoryInMemory } from '../../../user/repositories/in-memory/user-repository-in-memory'
import { CreateFoodUseCase } from './create-food-use-case'
import { CreateUserUseCase } from '../../../user/use-cases/create-user/create-user-use-case'
import { FoodDto } from '../../dtos/food-dto'

let userRepositoryInMemory: UserRepositoryInMemory
let foodRepositoryInMemory: FoodRepositoryInMemory
let createFoodUseCase: CreateFoodUseCase
let createUserUseCase: CreateUserUseCase

describe('Create Food', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    foodRepositoryInMemory = new FoodRepositoryInMemory()
    createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
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

  it('should be able an create food', async () => {
    const user = await createUserUseCase.execute(userTest)
    expect(user).toHaveProperty('id')

    const foodResult = await createFoodUseCase.execute({
      ...food,
      userId: user.id,
    })

    expect(foodResult).toHaveProperty('name')
    expect(foodResult.diet).toEqual(true)
    expect(foodResult).toMatchObject(food)
  })
})
