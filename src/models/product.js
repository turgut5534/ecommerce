const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const Cart = require('./cart')
const orderItem = require('./orderItem')
const ProductCategory = require('./productCategory')
const ProductSeller = require('./productSeller')
const Review = require('./reviews')
const ProductFeature = require('./productFeature')
const ProductFile = require('./productFiles')
const ProductDiscount = require('./productDiscount')

const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
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
    slug: {
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
Product.hasMany(Review)
Product.hasMany(ProductFeature)
Product.hasMany(ProductFile)
Product.hasMany(ProductDiscount)

orderItem.belongsTo(Product)
Cart.belongsTo(Product)
ProductCategory.belongsTo(Product)
ProductSeller.belongsTo(Product)
Review.belongsTo(Product)
ProductFeature.belongsTo(Product)
ProductFile.belongsTo(Product)
ProductDiscount.belongsTo(Product)

module.exports = Product