const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const ProductCategory = require('./productCategory');
const CategoryFeature = require('./categoryFeature');

const Category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

Category.hasMany(ProductCategory)
Category.hasMany(CategoryFeature)

ProductCategory.belongsTo(Category)
CategoryFeature.belongsTo(Category)

module.exports = Category