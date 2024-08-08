// first import "addSong, listSong" function from songController.js

import { addSong, listSong, removeSong } from "../controllers/songController.js";
import express from 'express'
import upload from "../middleware/multer.js";


// create router
const songRouter = express.Router(); // using this router we will create multiple api

// So, first we will create API for 'addSong'
songRouter.post('/add', upload.fields([{name:"image", maxCount:1},{name:"audio", maxCount:1}]),addSong);
// after that we will create another API for listSongs
songRouter.get('/list', listSong);
// create route for removeSong
songRouter.post('/remove', removeSong)

export default songRouter;


