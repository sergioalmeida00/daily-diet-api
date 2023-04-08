import { beforeEach, describe, expect, it } from 'vitest'
import { UserRepositoryInMemory } from '../../repositories/in-memory/user-repository-in-memory'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'
import { CreateUserUseCase } from '../create-user/create-user-use-case'
import { UserDTO } from '../../dtos/user-dto'

let userRepositoryInMemory: UserRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    )
  })

  const userTest: Omit<UserDTO, 'id'> = {
    name: 'Sérgio Almeida',
    email: 'sergioalmeidaa00@gmail.com',
    password: '123456',
  }

  it('should be able to authenticate an user', async () => {
    await createUserUseCase.execute(userTest)

    const resultToken = await authenticateUserUseCase.execute({
      email: userTest.email,
      password: userTest.password,
    })

    expect(resultToken).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: userTest.email,
        password: userTest.password,
      })
    }).rejects.toThrowError(/Incorrect/)
  })

  it('should not be able to authenticate an incorrect password', async () => {
    await expect(async () => {
      await createUserUseCase.execute(userTest)

      await authenticateUserUseCase.execute({
        email: userTest.email,
        password: 'test',
      })
    }).rejects.toThrowError(/Incorrect/)
  })
})
