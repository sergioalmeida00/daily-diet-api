import { FoodDto, MetricsFoodDto } from '../dtos/food-dto'

interface IFoodRepository {
  create(data: FoodDto): Promise<FoodDto>
  update(data: FoodDto): Promise<FoodDto>
  findAll(userId: string): Promise<FoodDto[] | undefined>
  findById({
    id,
    userId,
  }: Pick<FoodDto, 'id' | 'userId'>): Promise<FoodDto | undefined>
  deleteById(data: Pick<FoodDto, 'id' | 'userId'>): Promise<boolean>
}

export { IFoodRepository }
