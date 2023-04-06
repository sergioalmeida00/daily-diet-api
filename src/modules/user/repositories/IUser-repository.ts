import { UserDTO } from '../dtos/user-dto'

interface IUserRepository {
  create(data: UserDTO): Promise<UserDTO>
  findByEmail(email: string): Promise<UserDTO | undefined>
  findById(id: string): Promise<UserDTO | undefined>
}

export { IUserRepository }
