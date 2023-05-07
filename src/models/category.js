const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const ProductCategory = require('./productCategory')

const Category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

Category.hasMany(ProductCategory)
ProductCategory.belongsTo(Category)

module.exports = Category