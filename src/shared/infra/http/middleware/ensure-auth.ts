import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayloadDTO {
  sub: string
}

export function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
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

    request.user = {
      id: userId,
    }

    next()
  } catch (error) {
    throw new Error('JWT Token Invalid')
  }
}
