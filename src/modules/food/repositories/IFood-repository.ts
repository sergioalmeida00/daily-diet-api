import { FoodDto } from '../dtos/food-dto'

interface IFoodRepository {
  create(data: FoodDto): Promise<FoodDto>
  update(data: FoodDto): Promise<FoodDto>
  findAll(userId: string): Promise<FoodDto[] | undefined>
}

export { IFoodRepository }
