import mongoose from "mongoose";

// create Schema for our songs
const songSchema = new mongoose.Schema({
  // here we will define the property of our songs
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

// using this schema create one model
const songModel  = mongoose.models.song || mongoose.model("song", songSchema) // so, first here we will check if any models avaliable with the name song then we will used (mongoose.models.song) , if it is not avaliable then it will created (mongoose.model("song", songSchema))
// song - it is a model name.

export default songModel;


