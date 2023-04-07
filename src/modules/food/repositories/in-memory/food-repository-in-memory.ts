import { FoodDto, MetricsFoodDto } from '../../dtos/food-dto'
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

  async findAll(userId: string): Promise<FoodDto[]> {
    const resultFoods = this.foods.filter((food) => food.userId === userId)

    return resultFoods
  }

  async deleteById({
    id,
    userId,
  }: Pick<FoodDto, 'id' | 'userId'>): Promise<boolean> {
    const rowIndex = this.foods.findIndex(
      (food) => food.id === id && food.userId === userId,
    )

    if (rowIndex > -1) {
      this.foods.splice(rowIndex, 1)
      return true
    }

    return false
  }

  async findById({
    id,
    userId,
  }: Pick<FoodDto, 'id' | 'userId'>): Promise<FoodDto | undefined> {
    const foodResult = this.foods.find(
      (food) => food.id === id && food.userId === userId,
    )

    return foodResult
  }
}
