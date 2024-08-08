import mongoose from "mongoose";

// create schema 
const albumSchema = new mongoose.Schema({
    // here we will define the property for our album 
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    bgColour:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },

})
// using this schema we will create album model

const albumModel = mongoose.models.album || mongoose.model("album", albumSchema)
export default albumModel;
