const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const Cart = sequelize.define('cart', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total_amount: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  });

module.exports = Cart