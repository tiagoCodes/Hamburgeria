import prisma from '../Config/db.js'
import * as yup from 'yup'

export class createProducts {
    async store(req, res) {
        const products = req.body
        const imgPath = req.file.filename
        try {
            //VALIDA OS DADOS DO USUARIO
            const productSchema = yup.object({
                name: yup.string().required(),
                price: yup.number().required(),
                category: yup.string().required(),
            })
            const dateValidation = productSchema.validateSync(products, { abortEarly: false }) //  Como strict não foi definido, o padrão do Yup é tentar converter/transformar os valores (sincrono)

            // VERIFICA SE O PRODUTO JÁ EXISTE
            const validation = await prisma.products.findUnique({
                where: {
                    name: products.name,
                },
            })
            if (validation) {
                return res.status(409).json({ mensagem: 'Esse Produto já existe' })
            }

            //CRIAÇÃO DO PRODUTO
            const now = new Date()
            const createProducts = await prisma.products.create({
                data: {
                    name: products.name,
                    price: dateValidation.price,
                    path: imgPath,
                    category: products.category,
                    created_at: now,
                    updated_at: now,
                },
            })

            res.status(201).json({ mensagem: createProducts })
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensagem: 'Error in Server' })
        }
    }
}

export class editProducts {
    async update(req, res) {
        //VERIFICA SE O ID É UM NUMERO
        const products = req.body
        const id = Number(req.params.id)
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ mensagem: 'Id is Invalid or does not exist' })
        }
        const data = {}
        if (products.name !== undefined) data.name = products.name // vefica se name foi modificado
        if (products.price !== undefined) data.price = products.price // vefica se price foi modificado
        if (products.path !== undefined) data.path = products.path // vefica se path foi modificado
        if (products.category !== undefined) data.category = products.category // vefica se category foi modificado

        if (Object.keys(data).length == 0) {
            return res.status(400).json({ mensagem: 'Informe um campo para editar' })
        }
        try {
            // FAZ A EDIÇÃO
            const editProducts = await prisma.products.update({
                where: { id },

                data: {
                    ...data, // (...) copia os dados de dentro de um objeto para outro
                },
            })
            res.status(200).json({ mensagem: editProducts })
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensagem: 'Error in Server' })
        }
    }
}

export class deletePorducts {
    async destroy(req, res) {
        const id = Number(req.params.id)
        //VERIFICA SE O ID É UM NUMERO
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ mensagem: 'Id is Invalid or does not exist' })
        }
        try {
            const deletePorducts = await prisma.products.delete({
                where: { id },
            })
            res.status(200).json({ mensagem: `Produto excluido ${deletePorducts}` })
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensagem: 'Error in Server' })
        }
    }
}

export class listProducts {
    async index(req, res) {
        try {
            const listProducts = await prisma.products.findMany()
            if (listProducts.length === 0) {
                return res.status(204).end()
            }

            res.status(200).json(listProducts)
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensagem: 'Error in Server' })
        }
    }
}
