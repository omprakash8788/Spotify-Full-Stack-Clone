import express from 'express'
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumController.js' 
import upload from '../middleware/multer.js'

// create router
const albumRouter = express.Router();
// Post method
albumRouter.post('/add', upload.single('image'), addAlbum) // upload is a middleware
// image - it is a field name 
// addAlbum - it is a function
// Now add the second routes
// Get method
albumRouter.get('/list', listAlbum);

albumRouter.post('/remove', removeAlbum)

export default albumRouter;