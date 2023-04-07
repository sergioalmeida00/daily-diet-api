import { Request, Response } from 'express'
import { DeleteFoodUseCase } from './delete-food-use-case'

export class DeleteFoodController {
  constructor(private deleteFoodUseCase: DeleteFoodUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { id: userId } = request.user

    await this.deleteFoodUseCase.execute({ id, userId })

    return response.sendStatus(204)
  }
}
