import bcrypt from 'bcrypt'
import prisma from '../db.js'
import jwt from 'jsonwebtoken'
import * as yup from 'yup'

const JWT_SECRET = process.env.JWT_SECRET

export class authCadastro {
    async store(req, res) {
        try {
            const user = req.body

            // valida os dados do usuario
            const userSchema = yup.object({
                name: yup
                    .string()
                    .matches(/^\P{N}+$/u, 'O nome não pode conter números')
                    .required(),

                email: yup.string().email().required(),
                password: yup.string().min(6).required(),
            })
            await userSchema.validate(user, { abortEarly: false, strict: true })

            // verifica se o cadastro ja existe no banco de dados
            const emailValid = await prisma.users.findUnique({
                where: {
                    email: user.email,
                },
            })
            if (emailValid) {
                res.status(400).json({ mensagem: 'Esse email já existe' })
            }

            // faz a cryptografia da senha
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(user.password, salt)

            // faz a criação do novo usuario no banco
            const cadastro = await prisma.users.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: hashPassword,
                },
            })
            res.status(201).json(cadastro)
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // verifica se o erro é gerado pela validação do yup
                return res.status(400).json({ mensagem: error.errors })
            }
            console.log(error)
            res.status(500).json('Error in Server')
        }
    }
}

export class authLogin {
    async store(req, res) {
        const user = req.body
        try {
            const userSchema = yup.object({
                email: yup.string().email().required(),
                password: yup.string().required(),
            })
            await userSchema.isValid(user, { strict: true })
            // verifica se um email já está cadastra
            const login = await prisma.users.findUnique({
                where: {
                    email: user.email,
                },
            })

            if (!login) {
                return res.status(400).json({ mensagem: 'Email or Password invalid' })
            }
            // verifica se a senha está correta
            const isMatch = await bcrypt.compare(user.password, login.password)

            if (!isMatch) {
                return res.status(404).json('Email or Password invalid')
            }
            // gera um token
            const token = jwt.sign({ id: login.id }, JWT_SECRET, { expiresIn: '5m' })

            res.status(201).json(token)
        } catch (error) {
            if(error instanceof yup.ValidationError){
                return res.status(400).json({mensagem: error.errors})
            }
            console.log(error)
            res.status(500).json('Error in Server')
        }
    }
}
