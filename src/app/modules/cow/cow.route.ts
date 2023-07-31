import express from 'express'
import { CowController } from './cow.controller'
const router = express.Router()


router.patch('/:id', CowController.updatedCow)
router.get('/:id', CowController.getSingleCow)
router.delete('/:id', CowController.deleteCow)
router.get('/', CowController.getAllCows)
router.post('/', CowController.createCow)

export const CowRoutes = router