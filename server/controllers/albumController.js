import Album from "../models/Album.js";
import Track from "../models/Track.js";
import User from "../models/User.js";
import fs from "fs";

async function isAuthor(username, album) {
    if (!(username || album)) {
        throw 'Параметры не переданы'
    }
    const user = await User.findOne({username})
    return user._id.toString() === album.author._id.toString()
}

class AlbumController {
    async getAll(req, res) {
        const user = await User.findOne({username: req.user.username})
            .populate({
                path: 'albums', select: '-__v -author',
                populate: {path: 'tracks', select: '-__v -inAlbum'}
            })

        return res.json(user.albums)
    }

    async getOne(req, res) {
        try {
            const album = await Album.findById(req.params.id).populate('tracks', '-inAlbum -__v')
            if (await isAuthor(req.user.username, album)) {
                return res.json(album)
            } else {
                return res.status(403).json({message: 'Доступ запрещён'})
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка'})
        }
    }

    async create(req, res) {
        const {title} = req.body

        if (!title) {
            return res.status(400).json({message: 'Введите название альбома'})
        }

        const user = await User.findOne({
            username: req.user.username
        })

        const album = new Album({
            title,
            author: user,
            tracks: []
        })

        album.save(function (err) {
            user.albums.push(album)
            user.save()
        })

        return res.redirect(`${album._id}`)
    }

    async update(req, res) {
        try {
            const album = await Album.findById(req.params.id).populate('tracks', '-inAlbum -__v')

            if (!album) {
                return res.status(400).json({message: 'Альбом не найден'})
            }

            if (!await isAuthor(req.user.username, album)) {
                return res.status(403).json({message: 'Доступ запрещён'})
            }

            if (req.file) {
                await fs.unlink(`./public/albums/${album.image}`, err => {
                    if (err) {
                        return res.status(500).json({message: 'Внутренняя ошибка сервераыыы'})
                    }
                })
                album.image = req.file.filename
            }

            if (req.body.title) {
                album.title = req.body.title
            }

            await album.save()
            return res.json({
                message: 'Успешно обновлено',
                album: {

                }
            })
        } catch (e) {
            return res.status(400).json({message: 'Ошибка'})
        }
    }

    async delete(req, res) {
        try {
            const album = await Album.findById(req.params.id)

            if (!album) {
                return res.status(400).json({message: 'Альбом не найден'})
            }

            if (!await isAuthor(req.user.username, album)) {
                return res.status(403).json({message: 'Доступ запрещён'})
            }

            await Album.deleteOne({_id: req.params.id})
        } catch (e) {
            return res.status(400).json({message: 'Ошибка'})
        }
    }

    async getTrack(req, res) {
        try {
            const track = await Track.findById(req.params.id).populate('inAlbum', '_id title image')

            if (track === null) {
                return res.json({message: 'Трек не найден'})
            }

            return res.json(track)
        } catch (e) {
            console.log(e)
            return res.status(500)
        }
    }

    async addTrack(req, res) {
        const {title, featuring, isExplicit} = req.body
        const album = await Album.findById(req.params.id)

        const track = new Track({
            title,
            featuring,
            isExplicit,
            inAlbum: album
        })
        track.save(function (err) {
            album.tracks.push(track)
            album.save()
        })

        res.redirect(`${req.params.id}`)
    }

    async updateTrack(req, res) {

    }

    async deleteTrack(req, res) {

    }
}

export default new AlbumController()