import { UserDTO } from '../../dtos/user-dto'
import { IUserRepository } from '../IUser-repository'

export class UserRepositoryInMemory implements IUserRepository {
  users: UserDTO[] = []

  async create({ id, email, name, password }: UserDTO): Promise<UserDTO> {
    const user = {}
    const userResult = Object.assign(user, { id, email, name, password })
    this.users.push(userResult)
    return userResult
  }

  async findByEmail(email: string): Promise<UserDTO | undefined> {
    const userByEmail = this.users.find((user) => user.email === email)

    return userByEmail
  }

  async findById(id: string): Promise<UserDTO | undefined> {
    const resultUserById = this.users.find((user) => user.id === id)

    return resultUserById
  }
}
