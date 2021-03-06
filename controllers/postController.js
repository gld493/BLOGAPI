const Post = require('../models/postModel')


const getPosts = async (req,res) => {
    const posts = await Post.find();
    res.status(200).json(posts)
}

const getPostById = async (req,res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post)
}

const addPost = async (req, res) => {
    try {
        const post = await Post.create({
            user: res.locals.user,//user object is retreived
            title: req.body.title,
            article: req.body.article
        })
        res.status(201).json(post)
    } catch (err) {
        res.status(401).json({
            message: "Error in adding a new article",
            err: err.message,

        })
    }
}

const editPost = async (req,res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new console.error('Post not found');
    }

    const updatedpost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedpost)
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(400).json({error:"Post not found."});
            
        }

        //make sure user can only delete their posts except admin
        if ((post.user != res.locals.user._id) && (res.locals.user.role != "admin") ) {
            return res.status(401).json("Controller: You don not have permission to perform this action. " )            
        }

        await post.remove()
        res.status(200).json({ id: req.params.id, msg: "Post has been deleted." })
    } catch (err) {
        res.status(401).json({
            message: "Error in adding deleting post",
            err: err.message,

        })        
    }
}


module.exports = {getPosts, addPost, editPost, deletePost, getPostById}