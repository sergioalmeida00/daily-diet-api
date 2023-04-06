import { Request, Response } from 'express'
import { CreateFoodUseCase } from './create-food-use-case'

export class CreateFoodController {
  constructor(private createFoodUseCase: CreateFoodUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, date, time, diet } = request.body
    const { id: userId } = request.user

    const resultFood = await this.createFoodUseCase.execute({
      name,
      description,
      date,
      time,
      diet,
      userId,
    })

    return response.status(201).json({ resultFood })
  }
}
