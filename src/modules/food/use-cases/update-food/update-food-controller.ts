import { Request, Response } from 'express'
import { UpdateFoodUseCase } from './update-food-use-case'

export class UpdateFoodController {
  constructor(private updateFoodUseCase: UpdateFoodUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, description, date, time, diet } = request.body
    const { id: userId } = request.user

    const resultFood = await this.updateFoodUseCase.execute({
      id,
      name,
      description,
      date,
      time,
      diet,
      userId,
    })

    return response.status(204).json(resultFood)
  }
}
