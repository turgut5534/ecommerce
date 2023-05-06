const express = require('express')
const router = new express.Router()

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