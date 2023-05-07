const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');
const Product = require('./product');

const Brand = sequelize.define('brand', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    logo: {
        type: Sequelize.STRING
    }
  });

module.exports = Brand

Brand.hasMany(Product)
Product.belongsTo(Brand)