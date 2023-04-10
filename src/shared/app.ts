import express from 'express'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import { router } from './infra/http/routes'
import swaggerDocument from '../swagger.json'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(router)

export { app }
