const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');

const ProductFile = sequelize.define('product_file', {
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extension: {
        type: Sequelize.STRING,
        allowNull: false
      }
  });

module.exports = ProductFile