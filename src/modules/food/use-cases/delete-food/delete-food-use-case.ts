import { FoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../../repositories/IFood-repository'

export class DeleteFoodUseCase {
  constructor(private foodRepository: IFoodRepository) {}

  async execute({ id, userId }: Pick<FoodDto, 'id' | 'userId'>): Promise<void> {
    const successDeleted = await this.foodRepository.deleteById({ id, userId })

    if (!successDeleted) {
      throw new Error('Invalid item..')
    }
  }
}
