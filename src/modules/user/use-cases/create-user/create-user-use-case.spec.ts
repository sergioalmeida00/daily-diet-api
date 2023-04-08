import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { UserRepositoryInMemory } from '../../repositories/in-memory/user-repository-in-memory'
import { CreateUserUseCase } from './create-user-use-case'

let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  const userTest = {
    name: 'Sérgio Almeida',
    email: 'sergioalmeidaa00@gmail.com',
    password: '123456',
  }

  it('should be able an create user', async () => {
    const user = await createUserUseCase.execute(userTest)
    expect(user).toHaveProperty('id')
    expect(user.email).toEqual('sergioalmeidaa00@gmail.com')
  })

  it('should not be able user email exists', async () => {
    await createUserUseCase.execute(userTest)
    await expect(createUserUseCase.execute(userTest)).rejects.toThrowError(
      new Error('Email already exists'),
    )
  })
})
