import { FoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../../repositories/IFood-repository'
import { randomUUID } from 'node:crypto'

export class CreateFoodUseCase {
  constructor(private foodRepository: IFoodRepository) {}

  async execute({
    name,
    description,
    date,
    time,
    diet,
    userId,
  }: Omit<FoodDto, 'id'>): Promise<FoodDto> {
    const id = randomUUID()

    const resultFood = await this.foodRepository.create({
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
