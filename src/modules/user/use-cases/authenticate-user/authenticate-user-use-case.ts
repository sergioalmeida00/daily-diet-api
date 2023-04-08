import 'dotenv/config'
import { sign } from 'jsonwebtoken'
import { UserDTO } from '../../dtos/user-dto'
import { IUserRepository } from '../../repositories/IUser-repository'
import { compare } from 'bcryptjs'

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: Pick<UserDTO, 'email' | 'password'>) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Incorrect Email/Password')
    }

    const passwordMath = await compare(password, user.password)

    if (!passwordMath) {
      throw new Error('Incorrect Email/Password')
    }
    const token = sign(
      { id: user.id, email: user.email },
      `${process.env.SECRET_AUTH}`,
      { expiresIn: `${process.env.EXPIRE_IN_AUTH}`, subject: user.id },
    )

    return { token }
  }
}
