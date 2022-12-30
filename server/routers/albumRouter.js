import express from 'express'
import AlbumController from "../controllers/albumController.js";
import authToken from "../middleware/authMiddleware.js";
import multer from 'multer';

const upload = multer({dest: './public/albums'})

const router = express.Router()

router.get('/', authToken, AlbumController.getAll)
router.get('/:id', authToken, AlbumController.getOne)
router.post('/new', authToken, upload.single('image'), AlbumController.create)
router.put('/:id', authToken, upload.single('image'), AlbumController.update)
router.delete('/:id', authToken, AlbumController.delete)
router.post('/:id', authToken, AlbumController.addTrack)
router.get('/track/:id', authToken, AlbumController.getTrack)

export default router