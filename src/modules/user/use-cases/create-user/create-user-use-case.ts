import { hash } from 'bcryptjs'
import { UserDTO } from '../../dtos/user-dto'
import { IUserRepository } from '../../repositories/IUser-repository'
import { randomUUID } from 'node:crypto'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: Omit<UserDTO, 'id'>) {
    const id = randomUUID()

    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new Error('Email already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.userRepository.create({
      id,
      name,
      email,
      password: passwordHash,
    })

    return user
  }
}
