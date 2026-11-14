import jwt from 'jsonwebtoken'
import prisma from '../Config/db.js'

const JWT_SECRET = process.env.JWT_SECRET

const authToken = async (req, res, next) => {
    if (!JWT_SECRET) {
        console.error('JWT_SECRET is not configured')
        return res.status(500).json({ mensagem: 'Erro de configuração do servidor' })
    }

    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) {
        
        return res.status(401).json({ mensagem: 'Token ausente ou inválido' })
        
    }
    // verifica se o teken é valido 
    let payload
    try {
        payload = jwt.verify(token.slice('Bearer '.length), JWT_SECRET)
    } catch (error){
        console.log(error)
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' })
    }


    try {
        const user = await prisma.users.findUnique({
            where: { id: payload.id },   //  busca no banco o usuário identificado pelo token
            select: { id: true, admin: true },   // limita os dados retornados: apenas id e admin. Assim, não carrega informações desnecessárias, como a senha
        })

        if (!user) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado' })
        }

        req.user = user
        return next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro ao verificar usuário' })
    }
}
    // verifica se o usuario é admin
export const requireAdmin = (req, res, next) => {
    if (!req.user?.admin) {
        return res.status(403).json({ mensagem: 'Apenas administradores podem acessar este recurso' })
    }

    return next()
}

export default authToken
