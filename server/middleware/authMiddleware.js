import jwt from 'jsonwebtoken'

// export function authToken (req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//
//     if (!token) {
//         return res.status(401).json({message: 'Войдите, чтобы получить доступ'})
//     }
//
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//         if (err) {
//             return res.status(403).json({message: 'Доступ запрещён'})
//         }
//
//         req.user = payload
//         next()
//     })
// }

export default function authToken (req, res, next) {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({message: 'Войдите, чтобы получить доступ'})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            res.clearCookie('access_token')
            return res.status(403).json({message: 'Доступ запрещён'})
        }

        req.user = payload
        next()
    })
}