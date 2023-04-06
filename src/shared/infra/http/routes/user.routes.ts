import { Router } from 'express'

import { UserRepositoryInMemory } from '../../../../modules/user/repositories/in-memory/user-repository-in-memory'
import { CreateUserUseCase } from '../../../../modules/user/use-cases/create-user/create-user-use-case'
import { CreateUserController } from '../../../../modules/user/use-cases/create-user/create-user-controller'

import { AuthenticateUserUseCase } from '../../../../modules/user/use-cases/authenticate-user/authenticate-user-use-case'
import { AuthenticateUserController } from '../../../../modules/user/use-cases/authenticate-user/authenticate-user-controller'

// CREATE USER
const userRepositoryInMemory = new UserRepositoryInMemory()
const createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
const createUserController = new CreateUserController(createUserUseCase)

// AUTHENTICATE USER
const authenticateUserUseCase = new AuthenticateUserUseCase(
  userRepositoryInMemory,
)
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
)

// START ROUTE USER
const userRoutes = Router()

userRoutes.post('/', (request, response) => {
  createUserController.handle(request, response)
})

userRoutes.post('/auth', (request, response) => {
  authenticateUserController.handle(request, response)
})

export { userRoutes }
