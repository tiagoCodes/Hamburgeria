import express from 'express'
import { authCadastro, authLogin, authListen } from '../controllers/users.controllers.js'
import authToken, { requireAdmin } from '../middleware/auth.token.js'

const usersRouter = express.Router()

const cadastroControllers = new authCadastro()
const loginControllers = new authLogin()
const listenControllers = new authListen()

usersRouter.post('/authCadastro', cadastroControllers.store)
usersRouter.post('/authLogin', loginControllers.store)
usersRouter.get('/authListen', authToken, requireAdmin, listenControllers.index)

export default usersRouter
