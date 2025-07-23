import express from 'express'
import Post from '../models/Post.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: "No token provided"});

    try {
        const decoded  = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id;
        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
}

router.post('/', authMiddleWare, async(req, res) => {
    const {title, content} = req.body;
    try {
        const post = await Post.create({title, content, author: req.userId});
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({message: 'Failed to create post', error})
    }
})

router.get('/', async(req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message: 'Failed to get posts', error})
    }
})

export default router;