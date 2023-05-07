const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');

const CategoryFeature = sequelize.define('category_feature', {});

module.exports = CategoryFeature