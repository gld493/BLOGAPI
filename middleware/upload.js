const e = require('express')
const Post = require('../models/postModel')
const User = require('../models/userModel')

const multer = require('multer')
const path = require('path');

/*
const uploadImage =   async (req, res) =>  {
      try {
            if (req.file === undefined) return res.send("you must select a file.");
            const imgUrl = `./images/uploaded/${req.file.filename}`;
            //record url in the database (user profile)         
            await User.findByIdAndUpdate(res.locals.user._id, {profile_img:imgUrl} )
                  .then(user => {
                        console.log("user profile updated")
                  })
            return res.status(200).json({ msg: "Image uploaded successfully", url: imgUrl });
           
      } catch (err) {
            res.status(401).json({
                  message: "Error uploading the image",
                  err: err.message,
              })            
      }      
};
*/
const storage = multer.diskStorage({      
      destination: (req, file, cb) => {  
            
                  cb(null, './images/uploaded');
            },
      filename: (req,  file, cb) => {
                  cb(null, file.originalname)                  
            }      
      });
  
const uploadImage = multer({
      storage: storage,
      limits: {
          fileSize: 1024 * 1024 * 5 // max 5mb for image size
      },
});
          
module.exports = { uploadImage } ;