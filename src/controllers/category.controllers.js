import prisma from '../Config/db.js'
import * as yup from 'yup'

export class createCategory {
    async story(req, res) {
        const category = req.body
        try {
            const validateSchema = yup.object({
                name: yup.string().required(),
            })

            if(!validateSchema){
                console.error
                return res.status(422).json({mensagem: 'Unprocessable Content'})
            }


            const validation = await prisma.category.findUnique({
                where:{
                    name: category.name
                }
            })

            if(validation){
                console.error
                return res.status(409).json({Mensagem: 'Conflict'})
            }


            const createCategory = await prisma.category.create({
                data:{
                    name: category.name
                }
            })
            res.status(201).json({Mensagem: createCategory})
        } catch (error) {
            console.log(error)
            res.status(401).json({Mensagem: 'Unauthorized'})
        }
    }
}
