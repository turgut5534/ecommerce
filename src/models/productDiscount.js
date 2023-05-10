const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');

const ProductDiscount = sequelize.define('product_discount', {
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});


module.exports = ProductDiscount;
