const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');
const CategoryFeature = require('./categoryFeature');
const ProductFeature = require('./productFeature');

const Feature = sequelize.define('feature', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

Feature.hasMany(CategoryFeature)
Feature.hasMany(ProductFeature)

CategoryFeature.belongsTo(Feature)
ProductFeature.belongsTo(Feature)

module.exports = Feature