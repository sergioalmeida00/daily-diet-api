import { FoodDto } from '../../dtos/food-dto'
import { IFoodRepository } from '../IFood-repository'

export class FoodRepositoryInMemory implements IFoodRepository {
  foods: FoodDto[] = []

  async create({
    id,
    name,
    description,
    date,
    time,
    diet,
    userId,
  }: FoodDto): Promise<FoodDto> {
    const food = {}

    const foodResult = Object.assign(food, {
      id,
      name,
      description,
      date,
      time,
      diet,
      userId,
    })

    this.foods.push(foodResult)

    return foodResult
  }
}
