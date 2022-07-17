const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const {getPosts,  addPost, editPost, deletePost, getPostById} = require('./controllers/postController')
const {currUser, login, register} = require('./controllers/userController')
const config = require('./config/config');
const middleware = require('./middleware/middleware')

//db connection
config.dbconn

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//endpoints
app.get('/api/posts', middleware.verify , getPosts)
app.get('/api/posts/:id', middleware.verify , getPostById)
app.post('/api/posts', middleware.verify , addPost)
app.put('/api/posts/:id', editPost)
app.delete('/api/posts/:id', middleware.verify , middleware.checkAccess(["admin", "basic"]), deletePost)

//user enpoint
app.post('/api/users', register)
app.get('/api/users/login', login)
app.get('/api/users/me',middleware.verify ,  currUser)

//error handler
app.use(errorHandler);

app.listen(config.port, () => console.log(`listening server on port ${config.port}`))

