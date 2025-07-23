import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message: 'User already exists'});

        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({name, email, password: hash});
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.status(201).json({user: newUser, token})
    } catch (error) {
        res.status(500).json({message: "server error", error})
    }
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credentials'});

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({message: 'Server error', error})
    }
})

export default router
