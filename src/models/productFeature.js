const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');

const ProductFeature = sequelize.define('product_feature', {
    value: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = ProductFeature