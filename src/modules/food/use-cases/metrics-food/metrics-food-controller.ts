import { Request, Response } from 'express'
import { MetricsFoodUseCase } from './metrics-food-use-case'

export class MetricsFoodController {
  constructor(private metricsFoodUseCase: MetricsFoodUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user

    const metricsFoodResult = await this.metricsFoodUseCase.execute({ userId })

    return response.status(200).json({ metricsFoodResult })
  }
}
