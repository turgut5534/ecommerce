const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const Cart = require('./cart')
const orderItem = require('./orderItem')
const ProductCategory = require('./productCategory')

const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    desciption: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

Product.hasMany(orderItem)
Product.hasMany(Cart)
Product.hasMany(ProductCategory)

orderItem.belongsTo(Product)
Cart.belongsTo(Product)
ProductCategory.belongsTo(Product)

module.exports = Product