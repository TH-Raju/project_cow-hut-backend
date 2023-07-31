import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()


router.patch('/:id', UserController.updateUser)
router.get('/:id', UserController.getSingleUser)
router.delete('/:id', UserController.deleteUser)
router.get('/', UserController.getAllUser)

export const UserRoutes = router