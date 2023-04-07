import { FoodDto, MetricsFoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../../repositories/IFood-repository'

export class MetricsFoodUseCase {
  constructor(private foodRepository: IFoodRepository) {}

  async execute({
    userId,
  }: Pick<FoodDto, 'userId'>): Promise<MetricsFoodDto | undefined> {
    const foodsUser = await this.foodRepository.findAll(userId)

    let sequence = 0
    const metricsFoodResult = foodsUser?.reduce(
      (
        {
          amountFood,
          amountFoodDiet,
          amountFoodNotDiet,
          percentageDiet,
          percentageNotDiet,
          maxSequence,
        },
        operation,
      ) => {
        if (operation.diet) {
          sequence++
          amountFoodDiet++
          if (sequence > maxSequence) {
            maxSequence = sequence
          }
        } else {
          sequence = 0
          amountFoodNotDiet++
        }
        amountFood++

        return {
          amountFood,
          amountFoodDiet,
          amountFoodNotDiet,
          percentageDiet: Number((amountFoodDiet / amountFood) * 100),
          percentageNotDiet: Number((amountFoodNotDiet / amountFood) * 100),
          maxSequence,
        }
      },
      {
        amountFood: 0,
        amountFoodDiet: 0,
        amountFoodNotDiet: 0,
        percentageDiet: 0,
        percentageNotDiet: 0,
        maxSequence: 0,
      },
    )

    return metricsFoodResult
  }
}
