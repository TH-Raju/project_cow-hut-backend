import express from 'express'
import { OrderController } from './order.controller'
const router = express.Router()

router.get('/', OrderController.getAllOrders)
router.get('/:id', OrderController.getSingleOrder)
router.post('/', OrderController.createOrder)

export const OrderRoutes = router