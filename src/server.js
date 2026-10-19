import express from 'express'
import router from './routes/users.rout.js'
import authToken from './middleware/auth.token.js'


const app = express()
app.use(express.json())

app.use("/", router)

app.listen(3000)
