import { FoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../../repositories/IFood-repository'

export class UpdateFoodUseCase {
  constructor(private foodRepository: IFoodRepository) {}

  async execute({
    id,
    name,
    description,
    date,
    time,
    diet,
    userId,
  }: FoodDto): Promise<FoodDto> {
    const resultFood = await this.foodRepository.update({
      id,
      name,
      description,
      date,
      time,
      diet,
      userId,
    })

    return resultFood
  }
}
