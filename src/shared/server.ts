import express from 'express'
import { router } from './infra/http/routes'

const app = express()
app.use(express.json())
app.use(router)

app.listen(3001, () => console.log(`Server is runnig..🚀️🚀️`))
