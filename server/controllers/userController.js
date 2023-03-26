import User from "../models/User.js";
import * as fs from "fs";

class UserController {
    async getAll(req, res) {
        const users = await User.find({}, '-_id name').populate('albums', '-_id title')
        return res.json(users)
    }

    async get(req, res) {
        try {
            const user = await User.findOne({
                username: req.params.username
            }, 'name albums').populate('albums', 'title image tracks')

            if (user === null) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                })
            }

            res.json(user)
        } catch (e) {
            return res.status(500).json({
                message: 'Произошла ошибка...'
            })
        }
    }

    async profile(req, res) {
        return res.sendStatus(200).json({message: 'Загрузка удалась!'})
    }

    async update(req, res) {
        const user = await User.findOne({username: req.user.username})

        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        if (req.file) {
            await fs.unlink(`./public/avatars/${user.avatar}`, err => {
                if (err) {
                    return res.status(500).json({message: 'Внутренняя ошибка сервера'})
                }
            })
            user.avatar = req.file.filename
        }

        if (req.body.name) {
            user.name = req.body.name
        }

        await user.save()
        return res.json({
            message: 'Успешно обновлено',
            user: {
                username: user.username,
                name: user.name,
                avatar: user.avatar,
                roles: user.roles
            }
        })
    }
}

export default new UserController()