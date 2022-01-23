const { DataTypes } = require('sequelize');
const conn = require('../connect');

const NewsModel = conn.define('news', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortDesc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.TEXT,
  },
  closed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  modelName: 'news',
  timestamps: true,
});

module.exports = NewsModel;
