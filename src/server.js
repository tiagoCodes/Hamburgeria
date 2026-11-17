import express from 'express'
import usersRouter from './routes/users.rout.js'
import productsRouter from './routes/products.rout.js'
import categoryRouter from './routes/category.rout.js'
import fileRoutesConfig from './Config/file.rout.js'

const app = express()
app.use(express.json())

app.use('/', usersRouter)
app.use('/', productsRouter)
app.use('/products-file', fileRoutesConfig)
app.use('/', categoryRouter)

app.listen(3000)
