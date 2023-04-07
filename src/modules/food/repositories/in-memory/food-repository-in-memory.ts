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

  async update({
    id,
    name,
    description,
    date,
    time,
    diet,
    userId,
  }: FoodDto): Promise<FoodDto> {
    const foodIndex = this.foods.findIndex((food) => food.id === id)

    if (foodIndex > -1) {
      if (this.foods[foodIndex].userId === userId) {
        const food = this.foods[foodIndex]
        this.foods[foodIndex] = {
          ...food,
          ...{ name, description, date, time, diet },
        }
      }
    }

    return this.foods[foodIndex]
  }
}
