import { FoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../../repositories/IFood-repository'

export class FindIdFoodUseCase {
  constructor(private foodRepository: IFoodRepository) {}

  async execute({
    id,
    userId,
  }: Pick<FoodDto, 'id' | 'userId'>): Promise<FoodDto | undefined> {
    const foodResult = await this.foodRepository.findById({ id, userId })

    return foodResult
  }
}
