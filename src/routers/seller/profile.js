const express = require('express')
const router = new express.Router()

const auth = require('../../middlewares/sellerAuth')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const compressImage = require('../../middlewares/compressImage')

const Seller = require('../../models/seller')

router.use(auth)

const uploadDirectory = path.join(__dirname, '../../../uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/users/')
    },
    filename: function (req, file, cb) {
      const uniqueId = uuidv4();
      const ext = path.extname(file.originalname);
      cb(null, uniqueId + ext);
    }
});
  
const upload = multer({ storage: storage });

router.get('/', async(req,res) => {

    try {
        
        res.render('seller/views/profile/profile')

    } catch(e) {
        console.log(e)
    }

})

router.post('/save', upload.single('logo'), compressImage, async(req,res) => {

    try {
        
        const { id, name, email, phone, address } = req.body

        const seller = await Seller.findByPk(id)

        if(!seller) {
            return res.send('Seller not found')
        }

        seller.name = name
        seller.email = email
        seller.phone = phone
        seller.address = address

        if(req.file) {
            seller.logo = req.file.filename
        }

        await seller.save()

        res.redirect('/seller/profile')

    } catch(e) {
        console.log(e)
    }

})


router.get('/account/disable', async(req,res) => {

    try {
        
        const seller = await Seller.findByPk(req.seller.id)

        seller.is_active = 0

        await seller.save()

        res.redirect('/seller/profile')

    } catch(e) {
        console.log(e)
    }


})

module.exports = router