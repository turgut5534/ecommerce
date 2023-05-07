const express = require('express')
const router = new express.Router()

//Middlewares
const auth = require('../../middlewares/sellerAuth')
const compressImage = require('../../middlewares/compressImage')
const compressMultipleImages = require('../../middlewares/compressMultipleImages')

const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const slugify = require('slugify')

const Product = require('../../models/product')
const Brand = require('../../models/brand')
const ProductSeller = require('../../models/productSeller')
const ProductFile = require('../../models/productFiles')

const uploadDirectory = path.join(__dirname, '../../../uploads')

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
                {model: Product, include: [
                    {model: ProductFile}
                ]}
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

router.get('/edit/:id', async(req,res) => {

    try{
        
        const brands = await Brand.findAll()
        const product = await Product.findByPk(req.params.id)

        res.render('seller/views/products/edit-product', {brands,product})

    } catch(e) {
        console.log(e)
    }

})

router.post('/save', upload.array('image'), compressMultipleImages, async(req,res) => {

    try {
        
        const { name, brandId} = req.body

        const product = new Product(req.body)
        product.image = req.files[0].filename
        product.brandId = brandId
        product.slug = slugify(name, {
            strict: true,
            lower: true
        })

        const newProduct = await product.save()

        const productSeller = new ProductSeller({
            productId: newProduct.id,
            sellerId: req.seller.id
        })

        await productSeller.save()

        if(req.files){
            
            const files = req.files

            for(const file of files) {

                const projectFile = new ProductFile({
                    filename: file.filename,
                    extension: path.extname(file.originalname),
                    productId: newProduct.id
                })

                await projectFile.save()

            }

        }

        res.redirect('/seller/products')

    } catch(e) {
        console.log(e)
    }

})

router.post('/update', upload.array('image'), compressMultipleImages, async(req,res) => {

    try {
        
        const {id, name, price, stock, description, image } = req.body

        const product = await Product.findByPk(id)

        product.name = name
        product.price = price
        product.stock = stock
        product.description = description
        product.slug = slugify(name, {
            strict: true,
            lower: true
        })

        if(req.files){
            
            const files = req.files

            for(const file of files) {

                const projectFile = new ProductFile({
                    filename: file.filename,
                    extension: path.extname(file.originalname),
                    productId: product.id
                })

                await projectFile.save()

            }

        }


        await product.save()

        res.redirect('/seller/products')

    } catch(e) {
        console.log(e)
    }

})

router.delete('/delete/:id' , async(req,res) => {

    try{

        const product = await Product.findByPk(req.params.id)

        if(!product) {
            return res.status(400).json({
                status: false,
                message: 'Product not found!'
            })
        }

        await ProductSeller.destroy({
            where: {
                sellerId: req.seller.id,
                productId: product.id
            }
        })

        const productFiles = await ProductFile.findAll({
            where: {
                productId: product.id
            }
        })

        if(productFiles) {

            for(const file of productFiles) {

                try{

                    const path = uploadDirectory + '/products/' + file.filename
                    await fs.promises.unlink(path)
    
                } catch(e) {
                    console.log(e)
                }

                await file.destroy()
            }

        }

        
        await product.destroy()

        res.status(200).json({
            status: true,
            message: 'Deleted successfuly!'
        })

    } catch(e) {
        console.log(e)
        res.status(500).json({
            status: false,
            message: 'Internal Server Error!'
        })

    }

})

module.exports = router