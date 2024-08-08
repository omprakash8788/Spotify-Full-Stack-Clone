import multer from 'multer'


// here we will define disk storage
const storage = multer.diskStorage({
    // here define the file name
    filename: function(req, file, callback){
         callback(null, file.originalname) // here we will provide null and we will provide file name we will use the original file name (originalname) as our file name. suppose we are uploading the image or mp3 file then we will store the file on the cloudinary then the file name will be file.originalname

    }
})

// create one upload middleware
const upload = multer({
    storage
});

// after that we will export middleware
export default upload;

// Note - so here we will create the middleware that extract the file from the API request and it will provide its path 

