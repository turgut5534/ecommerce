const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const orderItem = require('./orderItem')

const Order = sequelize.define('order', {
    total_amount: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    shipping_address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shipping_phone: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

Order.hasMany(orderItem)
orderItem.belongsTo(Order)

module.exports = Order