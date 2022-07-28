const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const { json } = require('express')
rounds = 10



exports.currUser = async (req,res) => {
    res.json({msg: 'current user'})
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        //check if all fields has been added
        if (!name || !email || !password) {            
            throw new Error('please add all fields')
        }
    } catch (Err) {
        res.status(400).json({
               message:  Err.message
        })
    }

    try {
        bcrypt.hash(password, rounds, (error, hash) => {
           if (error) res.status(500).json(error)
           else {
               User.create({
                   name: name, email: email, password: hash.toString(), role: role
               }).then(user =>                   
                   res.status(200).json({
                       message: "user successfully created.",
                       _id: user.id,
                       name: user.name,
                       email: user.email,
                       role: user.role,
                       token: generateToken(user)                      
                   })                    
                ).then(user => res.locals.user = user.data)           
            }
        })            
    } catch (err) {
        res.status(401).json({
            message: "Error in creating user account.",
            err: err.message,
        })     
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        //check if email is in  database
        await User.findOne({ email: email })
            .then(user => {
                if (!user) res.status(404).json({ error: 'no user with that email found' })
                else {                    
                    bcrypt.compare(password, user.password, (error, match) => {
                        if (error) res.status(500).json(error)
                        else if (match) res.status(200).json({
                            msg: "successful login",
                            _id: user.id,
                            name: user.name,
                            email: user.email,
                            token: generateToken(user)
                        })
                        else res.status(403).json({ error: 'Invalid credentials' })
                    })            
                }
            })
    } catch (err) {
        res.status(400).json({
            message: "An error occurred",
            err: err.message,            
        })
    }
}
//generate token
const generateToken = (user) =>{
    return jwt.sign({data: user }, process.env.TOKEN_SECRET, {
        expiresIn: '7d'
    })
}