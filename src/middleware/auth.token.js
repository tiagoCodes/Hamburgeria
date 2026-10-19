import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const authToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        

        if (!token || !token.startsWith('Bearer ')) {
            console.log(token)
            return res.status(404).json('Problema no token')
        }

        const tokenJwt = token.replace('Bearer ', '')
        const authToken = jwt.verify(tokenJwt, JWT_SECRET)
        
        if (!authToken) {
            return res.status(400).json('senha errada')
        }
        res.status(202).json('token')
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json('Server Error')
    }
}
export default authToken
