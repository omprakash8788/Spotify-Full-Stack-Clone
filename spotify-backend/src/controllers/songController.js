import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  //  first we will add the API logic for add song
  try {
    // here we extract all the api data
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0]; //  request . files . audio and this will be one array[0] so we will use the first element, so we will get the first audio files, similar for imageFile
    const imageFile = req.files.image[0];
    // after that we will upload these files on our cloudinary storage
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    }); // in the cloudinary we will store the images and videos we dont have any resource type in the cloudinary so for this audio file we will use the resource type is video.
    // when it will upload the audio file it will generate one response and we will store this response in the audioUpload variable.
    // In this audioUpload variable we will get the secure url property using that we can axis the upladed file

    // similary we can store our image also.
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    // Now we can save this data in our database
    const song = songModel(songData);
    // after that we will safe the data in our database
    await song.save();
    // after that this song will be save in our database

    // after that we will generate one response
    res.json({ success: true, message: "Song added" });
  } catch (error) {
    res.json({success:false})
  }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({}) // in this find method we will add the {} we will not apply any filter so that we will get all the data from the songModel and it will store in the allSongs variable.
        // after that we will generate one response
        res.json({success:true, songs:allSongs})
        
    } catch (error) {
        res.json({success:false});
        
    }
};

// song remove api
const removeSong = async (req, res)=>{
    try {
        await songModel.findByIdAndDelete(req.body.id); // after excuting this statement it will delete the data from the database. with this particular id
        // after that we will generate a response
        res.json({success:true, message:"Song removed"})
        
    } catch (error) {
        res.json({success:false})
        
    }

}

export { addSong, listSong , removeSong};
