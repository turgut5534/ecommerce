const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');
const ProductSeller = require('./productSeller');

const Seller = sequelize.define('seller', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
  });

Seller.hasMany(ProductSeller)
ProductSeller.belongsTo(Seller)

module.exports = Seller