import { createProducts, editProducts, deletePorducts, listProducts} from '../controllers/products.controllers.js'
import express from 'express'


const productsRouter = express.Router()
const controllersCreate = new createProducts()
const controllersEdit = new editProducts()
const controllersDelete = new deletePorducts()
const controllersList = new listProducts()

productsRouter.post('/createProducts', controllersCreate.store)
productsRouter.patch('/editProducts/:id', controllersEdit.update)
productsRouter.delete('/deletePorducts/:id', controllersDelete.destroy)
productsRouter.get("/listProducts", controllersList.index)
export default productsRouter
