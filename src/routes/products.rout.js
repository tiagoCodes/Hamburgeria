import { createProducts, editProducts, deletePorducts, listProducts } from '../controllers/products.controllers.js'
import express from 'express'
import authToken, { requireAdmin } from '../middleware/auth.token.js'
import multer from 'multer' // importa o multer
import multerConfig from '../Config/multer.js'  // importa as config do multer 

const productsRouter = express.Router()
const controllersCreate = new createProducts()
const controllersEdit = new editProducts()
const controllersDelete = new deletePorducts()
const controllersList = new listProducts()
const uploads = multer(multerConfig)  // multer recebe as configurações do multer 

//  uploads.single('file') Recebe um único arquivo enviado no campo "file" e o disponibiliza em req.file.
productsRouter.post('/createProducts', authToken, requireAdmin, uploads.single('file'), controllersCreate.store)
productsRouter.patch('/editProducts/:id', authToken, requireAdmin, controllersEdit.update)
productsRouter.delete('/deletePorducts/:id', authToken, requireAdmin, controllersDelete.destroy)
productsRouter.get('/listProducts', controllersList.index)
export default productsRouter
