import express from 'express'
import authToken, { requireAdmin }  from '../middleware/auth.token.js'
import { createCategory } from '../controllers/category.controllers.js'

const categoryRouter = express.Router()
const controllerCategory = new createCategory()
categoryRouter.post('/createCategory', authToken, requireAdmin, controllerCategory.story)
export default categoryRouter