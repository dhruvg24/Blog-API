import Post from "../models/Post.js";
import { validationResult } from "express-validator";

export const createPost = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {title, content} = req.body;
    try{
        const post = new Post({
            title, content, author: req.user.id
        });
        await post.save();
        res.json({message: 'post created succesfully', post});

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export const getPosts = async(req, res)=>{
    try {
        const posts = await Post.find().populate('author', 'username');
        // this helps in getting author id and username of author, else it just gives the author id(refer schema)
        res.json(posts);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


export const updatePost = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {title,content}=req.body;
    try{
        let post = await Post.findById(req.params.id);
        // finding post by id
        if(!post){
            return res.status(404).json({msg: 'Post not found!'});
        }

        if(post.author.toString()!==req.user.id){
            return res.status(401).json({msg:'Not authorized'})
        }

        post = await Post.findByIdAndUpdate(req.params.id, {$set: {title,content}},{new:true});
        res.json(post);
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg: 'Server error'});
    }
}

export const deletePost = async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }
        if(post.author.toString()!==req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({msg: 'Post removed successfully'});
        
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg: 'Server error'});
    }
}