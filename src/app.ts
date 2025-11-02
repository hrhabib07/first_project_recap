import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { studentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)
// app.use('/api/v1/students', studentRoutes)
// app.use('/api/v1/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app
