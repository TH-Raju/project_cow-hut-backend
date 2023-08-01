import express from 'express'
import { CowController } from './cow.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '../user/user.interface'
const router = express.Router()


router.patch('/:id', auth(UserRole.Seller), CowController.updatedCow)
router.get('/:id', auth(UserRole.Admin, UserRole.Buyer, UserRole.Seller), CowController.getSingleCow)
router.delete('/:id', auth(UserRole.Admin, UserRole.Buyer, UserRole.Seller), auth(UserRole.Seller), CowController.deleteCow)
router.get('/', auth(UserRole.Admin, UserRole.Buyer, UserRole.Seller), CowController.getAllCows)
router.post('/', auth(UserRole.Seller), CowController.createCow)

export const CowRoutes = router