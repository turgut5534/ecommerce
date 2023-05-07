const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const OrderItem = sequelize.define('order_item', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  });

module.exports = OrderItem