interface FoodDto {
  id: string
  name: string
  description: string
  date: Date
  time: string
  diet: boolean
  userId: string
}

interface MetricsFoodDto {
  amountFood: number
  amountFoodDiet: number
  amountFoodNotDiet: number
  percentageDiet: number
  percentageNotDiet: number
  maxSequence: number
}

export { FoodDto, MetricsFoodDto }
