import { FoodDto } from '../dtos/food-dto'

interface IFoodRepository {
  create(data: FoodDto): Promise<FoodDto>
}

export { IFoodRepository }
