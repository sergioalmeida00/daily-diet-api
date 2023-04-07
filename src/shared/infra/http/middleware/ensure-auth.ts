import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepositoryInMemory } from '../../../../modules/user/repositories/in-memory/user-repository-in-memory'

interface IPayloadDTO {
  sub: string
}

export async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const userRepositoryInMemory = new UserRepositoryInMemory()
  const { authorization } = request.headers

  if (!authorization) {
    throw new Error('JWT Token Missing Error')
  }

  const [, token] = authorization.split(' ')

  try {
    const { sub: userId } = verify(
      token,
      `${process.env.SECRET_AUTH}`,
    ) as IPayloadDTO

    const verifyUserExists = await userRepositoryInMemory.findById(userId)

    // if (!verifyUserExists) {
    //   throw new Error('User does not exist')
    // }

    request.user = {
      id: userId,
    }

    next()
  } catch (error) {
    throw new Error('JWT Token Invalid')
  }
}
