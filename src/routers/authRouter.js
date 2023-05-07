const express = require('express')
const router = new express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const User = require('../models/user')

router.get('/register', (req,res) => {

    res.render('site/views/register')

})

router.get('/login', (req,res) => {

    res.render('site/views/login')

})

router.post('/login', async(req,res) => {

    try {

        const { email, password } = req.body

        const user= await User.findOne({
            where: {
                email: email
            }
        })

        if(!user) {
            return res.status(400).json({
                status: false,
                message: 'Invalid email or password!'
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: 'Invalid email or password!'
            })
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '12h'})

        res.cookie('token', token, {httpOnly: true})

        res.status(200).json({
            status: false,
            message: 'Login successful!'
        })

    } catch(e) {
        console.log(e)
        res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }

})

router.post('/register', async(req,res) => {
    
    try {
        
        const { name, lastname, email, phone, password, repassword} = req.body

        if ( password != repassword) {
            return res.status(400).json({
                status: false,
                message: 'Password not match'
            })
        }

        const emailExists = await User.findOne({
            where: {
                email: email
            }
        })

        if(emailExists) {
            return res.status(400).json({
                status: false,
                message: 'A user with this email already exists!'
            })
        }

        const phoneExists = await User.findOne({
            where: {
                phone: phone
            }
        })

        if(phoneExists) {
            return res.status(400).json({
                status: false,
                message: 'This phone number is used by another user!'
            })
        }

        const user = new User({name,lastname,email,phone})
        user.password = await bcrypt.hash(password, 10)

        await user.save()

        res.status(201).json({
            status: true,
            message: 'Register is successful!'
        })

    } catch(e) {
        console.log(e)
        res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }

})

module.exports = router