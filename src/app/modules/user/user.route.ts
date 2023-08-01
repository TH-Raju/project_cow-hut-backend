import express from 'express'
import { UserController } from './user.controller'
import { UserRole } from './user.interface'
import auth from '../../middlewares/auth'
const router = express.Router()


router.patch('/:id', UserController.updateUser)
router.get('/:id', UserController.getSingleUser)
router.delete('/:id', UserController.deleteUser)
router.get('/',
    // auth(UserRole.Admin),
    UserController.getAllUser)

export const UserRoutes = router