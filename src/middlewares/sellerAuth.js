const jwt = require('jsonwebtoken')
const Seller = require('../models/seller')

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies.sellerToken

    if (!token) {
      throw new Error('No token found')
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const sellerId = decoded.sellerId

    const seller = await Seller.findByPk(sellerId)
    req.seller = seller

    res.locals.seller = seller

    next()
  } catch (err) {
 
    console.log(err)
    res.redirect('/seller/login')
  }
}

module.exports = authMiddleware