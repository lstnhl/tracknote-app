import User from "../models/User.js";
import {hash, compare} from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async login(req, res) {
        const {username, password} = req.body
        const user = await User.findOne({username})

        if (!user) {
            return res.status(401).json({message: "Неверный логин или пароль"})
        }

        if (!await compare(password, user.password)) {
            return res.status(401).json({message: "Неверный логин или пароль"})
        }

        const token = jwt.sign({
            username: user.username,
            name: user.name,
            roles: user.roles
        }, process.env.ACCESS_TOKEN_SECRET)

        return res
            .cookie('access_token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 2 * 1000,
                secure: true,
                sameSite: 'none'
            })
            .json({
                message: 'Вход выполнен',
                user: {
                    username: user.username,
                    name: user.name,
                    avatar: user.avatar,
                    roles: user.roles
                }
            })
    }

    async register(req, res) {
        const {username, name, password} = req.body

        if (!username || !name || !password) {
            return res.status(422).json({message: "Пожалуйста, введите все данные (логин, имя, пароль)"})
        }

        const user = await User.findOne({username})

        if (user) {
            return res.status(400).json({message: "Пользователь уже существует"})
        }

        try {
            const hashedPassword = await hash(password, 10)

            const newUser = await User.create({
                username,
                name,
                password: hashedPassword
            })

            return res.json({message: `Пользователь ${newUser.name} успешно создан`})
        } catch (e) {
            console.log(e)
            return res.status(500)
        }
    }

    async logout(req, res) {
        return res
            .clearCookie('access_token')
            .json({message: 'Выход произведён'})
    }
}

export default new AuthController()