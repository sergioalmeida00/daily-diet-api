import { beforeEach, describe, expect, it } from 'vitest'

import { UserRepositoryInMemory } from '../../../user/repositories/in-memory/user-repository-in-memory'
import { FoodRepositoryInMemory } from '../../repositories/in-memory/food-repository-in-memory'
import { CreateFoodUseCase } from '../create-food/create-food-use-case'
import { CreateUserUseCase } from '../../../user/use-cases/create-user/create-user-use-case'
import { DeleteFoodUseCase } from './delete-food-use-case'
import { randomUUID } from 'node:crypto'

let userRepositoryInMemory: UserRepositoryInMemory
let foodRepositoryInMemory: FoodRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let createFoodUseCase: CreateFoodUseCase
let deleteFoodUseCase: DeleteFoodUseCase

describe('Delete Food by id', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    foodRepositoryInMemory = new FoodRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
    deleteFoodUseCase = new DeleteFoodUseCase(foodRepositoryInMemory)
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

  it('should be possible to delete a food', async () => {
    const user = await createUserUseCase.execute(userTest)
    expect(user).toHaveProperty('id')

    await createFoodUseCase.execute({ ...food, userId: user.id })
    const foodById = await createFoodUseCase.execute({
      ...food,
      userId: user.id,
      diet: false,
    })

    await deleteFoodUseCase.execute({ id: foodById.id, userId: user.id })

    const result = await foodRepositoryInMemory.findById({
      id: foodById.id,
      userId: user.id,
    })

    expect(result).toBeUndefined()
  })

  it('should not be possible to delete food without User id', async () => {
    const foodById = await createFoodUseCase.execute({
      ...food,
      userId: randomUUID(),
      diet: false,
    })

    await expect(async () => {
      await deleteFoodUseCase.execute({
        id: foodById.id,
        userId: randomUUID(),
      })
    }).rejects.toThrowError(/Invalid/)
  })

  it('should not be possible to delete food without food id', async () => {
    const user = await createUserUseCase.execute(userTest)

    await expect(async () => {
      await deleteFoodUseCase.execute({
        id: randomUUID(),
        userId: user.id,
      })
    }).rejects.toThrowError(/Invalid/)
  })
})
