const express = require('express')
const router = new express.Router()

const User = require('../models/user')
const Product = require('../models/product')
const category = require('../models/category')
const Seller = require('../models/seller')
const Brand = require('../models/brand')
const Review = require('../models/reviews')
const Feature = require('../models/feature')

const variables = require('../middlewares/variables')
const Category = require('../models/category')
const ProductCategory = require('../models/productCategory')

router.use(variables)

router.get('/', (req,res) => {
    res.render('site/views/index')
})

router.get('/category/:slug', async(req,res) => {

    try{

        const category = await Category.findOne({
            where: {
                slug: req.params.slug
            }
        })

        const productCategories = await ProductCategory.findAll({
            where: {
                categoryId: category.id
            }, 
            include: [
                {model: Product}
            ]
        })
        
        const products= []

        for(const product of productCategories) {

            products.push(product.product)

        }


        res.render('site/views/products', {products})
    } catch(e) {
        console.log(e)
    }

})

router.get('/:category/:product', (req,res) => {

    res.render('site/views/product-single')

})

module.exports = router