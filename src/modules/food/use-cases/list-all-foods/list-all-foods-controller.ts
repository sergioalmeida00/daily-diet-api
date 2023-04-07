import { Request, Response } from 'express'
import { ListAllFoodsUseCase } from './list-all-foods--use-case'

export class ListAllFoodsController {
  constructor(private listAllFoodsUseCase: ListAllFoodsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user

    const resultFoods = await this.listAllFoodsUseCase.execute(userId)

    return response.status(200).json({ resultFoods })
  }
}
