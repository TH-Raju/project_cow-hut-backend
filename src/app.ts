import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErroHandler';
import { UserRoutes } from './app/modules/user/user.route';
import { CowRoutes } from './app/modules/cow/cow.route';
import { AuthUserRoutes } from './app/modules/user/user.auth.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { AdminRoutes } from './app/modules/admin/admin.route';

const app: Application = express()
const port = 3000


app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application Routes
app.use('/api/v1/admins/', AdminRoutes)
app.use('/api/v1/users/', UserRoutes)
app.use('/api/v1/auth/', AuthUserRoutes)
app.use('/api/v1/cows/', CowRoutes)
app.use('/api/v1/orders/', OrderRoutes)


app.get('/', (req, res) => {
    res.send('Server Working....')
})

app.use(globalErrorHandler)



export default app;