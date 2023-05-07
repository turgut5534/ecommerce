const express = require('express')
const router = new express.Router()

const User = require('../models/user')
const Product = require('../models/product')
const category = require('../models/category')
const Seller = require('../models/seller')
const Brand = require('../models/brand')
const Review = require('../models/reviews')

router.get('/', (req,res) => {
    res.render('site/views/index')
})

router.get('/:category', (req,res) => {

    res.render('site/views/products')

})

router.get('/:category/:product', (req,res) => {

    res.render('site/views/product-single')

})

module.exports = router