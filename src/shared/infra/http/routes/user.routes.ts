import { Router } from 'express'

import { UserRepositoryInMemory } from '../../../../modules/user/repositories/in-memory/user-repository-in-memory'
import { CreateUserUseCase } from '../../../../modules/user/use-cases/create-user/create-user-use-case'
import { CreateUserController } from '../../../../modules/user/use-cases/create-user/create-user-controller'

const userRepositoryInMemory = new UserRepositoryInMemory()
const createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
const createUserController = new CreateUserController(createUserUseCase)

const userRoutes = Router()

userRoutes.post('/', (request, response) => {
  createUserController.handle(request, response)
})

export { userRoutes }
