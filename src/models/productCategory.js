const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const ProductCategory = sequelize.define('product_category', {});

module.exports = ProductCategory