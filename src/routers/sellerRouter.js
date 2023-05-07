const express = require('express')
const router = new express.Router()
const Seller = require('../models/seller')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/sellerAuth')

const productRouter = require('./seller/product')

router.get('/dashboard', auth, async(req,res) => {

    try {
        res.render('seller/views/dashboard')
    } catch(e) {
        console.log(e)
    }

})

router.get('/register', (req,res) => {

    res.render('seller/views/register')

})

router.get('/login', (req,res) => {

    res.render('seller/views/login')

})

router.post('/save', async(req,res) => {

    try {

        const { name,email,password,repassword } = req.body

        if(password != repassword) {
            return res.status(400).json({
                status: false,
                message: 'Password not match!'
            })
        }

        const emailExists = await Seller.findOne({
            where: {
                email: email
            }
        })

        if(emailExists) {
            return res.status(400).json({
                status: false,
                message: 'A seller with this email already exists!'
            })
        }

        const nameExists = await Seller.findOne({
            where: {
                name: name
            }
        })

        if(nameExists) {
            return res.status(400).json({
                status: false,
                message: 'A seller with this name already exists!'
            })
        }

        const seller = new Seller({name,email})
        seller.password = await bcrypt.hash(password, 10)

        await seller.save()

        res.status(201).json({
            status: true,
            message: 'Registration successful!'
        })

    } catch(e) {
        console.log(e)
        res.status(500).json({
            status: false,
            message: e
        })
    }

})

router.post('/login', async(req,res) => {

    try {
        
        const { email, password } = req.body

        const seller = await Seller.findOne({
            where: {
                email: email
            }
        })

        if(!seller) {
            return res.status(400).json({
                status: false,
                message: 'Invalid username or password!'
            })
        }

        const passwordMatch = await bcrypt.compare(password, seller.password)

        if(!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: 'Invalid username or password!'
            })
        }

        const token = jwt.sign({sellerId: seller.id}, process.env.JWT_SECRET, {expiresIn: '12h'})

        res.cookie('sellerToken', token, {httpOnly: true})

        res.status(200).json({
            status: false,
            message: 'Login successful!'
        })

    } catch(e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }

})

router.get('/logout', (req,res) => {

    res.cookie('sellerToken', '', {expires: new Date(0)})

    res.redirect('/seller/login')
})

router.use('/products', productRouter)

module.exports = router