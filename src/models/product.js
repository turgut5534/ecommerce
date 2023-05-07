const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const Cart = require('./cart')
const orderItem = require('./orderItem')
const ProductCategory = require('./productCategory')
const ProductSeller = require('./productSeller')

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
    },
    is_trending: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    is_featured: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  });

Product.hasMany(orderItem)
Product.hasMany(Cart)
Product.hasMany(ProductCategory)
Product.hasMany(ProductSeller)

orderItem.belongsTo(Product)
Cart.belongsTo(Product)
ProductCategory.belongsTo(Product)
ProductSeller.belongsTo(Product)

module.exports = Product