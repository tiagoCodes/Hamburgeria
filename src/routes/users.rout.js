import express from 'express'
import { authCadastro, authLogin } from '../controllers/users.controllers.js'


const router = express.Router()

const cadastroControllers = new authCadastro()
const loginController = new authLogin()

router.post('/authCadastro', cadastroControllers.store)
router.post('/authLogin', loginController.store)

export default router