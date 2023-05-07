const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const ProductSeller = sequelize.define('product_seller', {});

module.exports = ProductSeller