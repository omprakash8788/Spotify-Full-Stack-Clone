// In this file we will config mongodb database
import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=>{
        console.log("Connect established");
        
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/spotify`)
}

export default connectDB;
// after that we will add one logic , using that when we are connecting with the database we will get one message in console terminals where we will display the message connect establish 
// mongoose.connection.on('connected', ()=>{
//     console.log("Connect established");
// })
