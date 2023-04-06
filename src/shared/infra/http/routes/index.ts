import { Router } from 'express'
import { userRoutes } from './user.routes'
import { routeFood } from './food.routes'

const router = Router()
router.use('/user', userRoutes)
router.use('/food', routeFood)
export { router }
