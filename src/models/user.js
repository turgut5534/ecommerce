const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');

const Cart = require('./cart')
const Order = require('./order');
const Review = require('./reviews');

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT
    },
    phone: {
      type: Sequelize.STRING
    }
  });

User.hasMany(Order)
User.hasMany(Cart)
User.hasMany(Review)

Order.belongsTo(User)
Cart.belongsTo(User)
Review.belongsTo(User)

sequelize.sync()

module.exports = User