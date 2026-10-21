import express from 'express'
import usersRouter from './routes/users.rout.js'
import productsRouter from './routes/products.rout.js'
import authToken from './middleware/auth.token.js'


const app = express()
app.use(express.json())

app.use("/", usersRouter)
app.use("/",  productsRouter)

app.listen(3000)
