import { FoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../../repositories/IFood-repository'

export class ListAllFoodsUseCase {
  constructor(private foodRepository: IFoodRepository) {}

  async execute(userId: string): Promise<FoodDto[] | undefined> {
    const resultFoods = await this.foodRepository.findAll(userId)

    return resultFoods
  }
}
