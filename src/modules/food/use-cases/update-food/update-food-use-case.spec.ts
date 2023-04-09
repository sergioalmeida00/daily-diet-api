import { beforeEach, describe, expect, it } from 'vitest'
import { UserRepositoryInMemory } from '../../../user/repositories/in-memory/user-repository-in-memory'
import { FoodRepositoryInMemory } from '../../repositories/in-memory/food-repository-in-memory'
import { CreateUserUseCase } from '../../../user/use-cases/create-user/create-user-use-case'
import { CreateFoodUseCase } from '../create-food/create-food-use-case'
import { UpdateFoodUseCase } from './update-food-use-case'

let userRepositoryInMemory: UserRepositoryInMemory
let foodRepositoryInMemory: FoodRepositoryInMemory
let createFoodUseCase: CreateFoodUseCase
let createUserUseCase: CreateUserUseCase
let updateFoodUseCase: UpdateFoodUseCase

describe('Update Food', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    foodRepositoryInMemory = new FoodRepositoryInMemory()
    createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
    updateFoodUseCase = new UpdateFoodUseCase(foodRepositoryInMemory)
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

  it('should be possible to update a food', async () => {
    const user = await createUserUseCase.execute(userTest)
    const foodResult = await createFoodUseCase.execute({
      ...food,
      userId: user.id,
    })

    const updateFood = await updateFoodUseCase.execute({
      ...foodResult,
      userId: user.id,
      diet: false,
      name: 'Hambúrguer',
    })

    expect(updateFood).toMatchObject({
      ...updateFood,
    })
  })
})
