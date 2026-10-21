import express from 'express'
import { authCadastro, authLogin } from '../controllers/users.controllers.js'


const usersRouter = express.Router()

const cadastroControllers = new authCadastro()
const loginController = new authLogin()

usersRouter.post('/authCadastro', cadastroControllers.store)
usersRouter.post('/authLogin', loginController.store)

export default usersRouter