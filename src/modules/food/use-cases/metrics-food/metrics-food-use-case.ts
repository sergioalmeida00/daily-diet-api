import { FoodDto, MetricsFoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../../repositories/IFood-repository'

export class MetricsFoodUseCase {
  constructor(private foodRepository: IFoodRepository) {}

  async execute({ userId }: Pick<FoodDto, 'userId'>): Promise<MetricsFoodDto> {
    const metricsFoodResult = await this.foodRepository.metricsFood({ userId })

    return metricsFoodResult
  }
}
