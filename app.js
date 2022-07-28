const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const {getPosts,  addPost, editPost, deletePost, getPostById} = require('./controllers/postController')
const {currUser, login, register} = require('./controllers/userController')
const config = require('./config/config');
const middleware = require('./middleware/middleware')
const User = require('./models/userModel')


//const multer = require('multer')
//const upload = multer({ dest: './images/uploaded/'})

const { uploadImage } = require('./middleware/upload')

//db connection
config.dbconn

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//endpoints
app.get('/api/posts', middleware.verify , getPosts)
app.get('/api/posts/:id', middleware.verify , getPostById)
app.post('/api/posts', middleware.verify , addPost)
app.put('/api/posts/:id', editPost)
app.delete('/api/posts/:id', middleware.verify, middleware.checkAccess(["admin", "basic"]), deletePost)

//user enpoint
app.post('/api/users', register)
app.get('/api/users/login', login)
app.get('/api/users/me', middleware.verify, currUser)

app.post("/api/upload", middleware.verify, uploadImage.single("file"), (req, res) => {
     
     const imgUrl = `./images/uploaded/${req.file.originalname}`;
     UpdateProfile(res,imgUrl)
     res.status(200).json({ msg: "file uploaded successfully." })
})

//function for updating the user db with the link to the profile image
UpdateProfile =  (res, img_url) => {     
     try {
         
          User.findByIdAndUpdate(res.locals.user._id, { profile_img: img_url })
                 .then(user => {
                       console.log("user profile updated")
                 })
                 
     }catch (err){
           res.status(401).json({
               message: "Error in updating  user profile.",
               err: err.message,
           })        
       }

}
 
//error handler
app.use(errorHandler);
app.listen(config.port, () => console.log(`listening server on port ${config.port}`))

