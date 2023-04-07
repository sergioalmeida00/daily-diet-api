import { Request, Response } from 'express'
import { FindIdFoodUseCase } from './find-id-food-use-case'

export class FindIdFoodController {
  constructor(private findIdFoodUseCase: FindIdFoodUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { id: userId } = request.user

    const foodResult = await this.findIdFoodUseCase.execute({ id, userId })

    return response.status(200).json({ foodResult })
  }
}
