const express = require('express')
const router = new express.Router()

//Middlewares
const auth = require('../../middlewares/sellerAuth')
const compressImage = require('../../middlewares/compressImage')

const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const Product = require('../../models/product')
const Brand = require('../../models/brand')
const ProductSeller = require('../../models/productSeller')

const uploadDirectory = path.join(__dirname, '../../uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products/')
    },
    filename: function (req, file, cb) {
      const uniqueId = uuidv4();
      const ext = path.extname(file.originalname);
      cb(null, uniqueId + ext);
    }
});
  
const upload = multer({ storage: storage });

router.use(auth)

router.get('/', async(req,res) => {

    try{
        
        const products = await ProductSeller.findAll({
            where: {
                sellerId: req.seller.id
            },
            include: [
                {model: Product}
            ]
        })

        res.render('seller/views/products/products', {products})

    } catch(e) {
        console.log(e)
    }

})

router.get('/add', async(req,res) => {

    try{
        
        const brands = await Brand.findAll()

        res.render('seller/views/products/add-product', {brands})

    } catch(e) {
        console.log(e)
    }

})

router.post('/save', upload.single('image'), compressImage, async(req,res) => {

    try {
        
        const {brandId} = req.body

        const product = new Product(req.body)
        product.image = req.file.filename
        product.brandId = brandId

        const newProduct = await product.save()

        const productSeller = new ProductSeller({
            productId: newProduct.id,
            sellerId: req.seller.id
        })

        await productSeller.save()

        res.redirect('/seller/products')

    } catch(e) {
        console.log(e)
    }

})

module.exports = router