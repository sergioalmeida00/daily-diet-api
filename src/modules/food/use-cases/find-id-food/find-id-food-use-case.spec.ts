import { beforeEach, describe, expect, it } from 'vitest'

import { UserRepositoryInMemory } from '../../../user/repositories/in-memory/user-repository-in-memory'
import { FoodRepositoryInMemory } from '../../repositories/in-memory/food-repository-in-memory'
import { CreateUserUseCase } from '../../../user/use-cases/create-user/create-user-use-case'
import { CreateFoodUseCase } from '../create-food/create-food-use-case'
import { FindIdFoodUseCase } from './find-id-food-use-case'

let userRepositoryInMemory: UserRepositoryInMemory
let foodRepositoryInMemory: FoodRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let createFoodUseCase: CreateFoodUseCase
let findIdFoodUseCase: FindIdFoodUseCase

describe('Find food by id', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    foodRepositoryInMemory = new FoodRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createFoodUseCase = new CreateFoodUseCase(foodRepositoryInMemory)
    findIdFoodUseCase = new FindIdFoodUseCase(foodRepositoryInMemory)
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
  it('should be possible to list food by id', async () => {
    const user = await createUserUseCase.execute(userTest)
    expect(user).toHaveProperty('id')

    await createFoodUseCase.execute({ ...food, userId: user.id })
    const foodById = await createFoodUseCase.execute({
      ...food,
      userId: user.id,
      diet: false,
    })

    const resultFoodById = await findIdFoodUseCase.execute({
      id: foodById.id,
      userId: user.id,
    })

    expect(resultFoodById?.userId).toEqual(user.id)
    expect(resultFoodById?.diet).toEqual(false)
    expect(resultFoodById).toBeTypeOf('object')
    expect(resultFoodById?.userId).not.toBeNull()
  })
})
