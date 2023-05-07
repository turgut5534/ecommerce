const Sequelize = require('sequelize')
const sequelize = require('../db/mysql');

const Review = sequelize.define('review', {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    comment: {
        type: Sequelize.TEXT
    }
  });

module.exports = Review