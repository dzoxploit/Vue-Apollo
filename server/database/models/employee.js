const { DataTypes } = require('sequelize');
const db = require('../connect');

const EmployeeModel = db.define('employees', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  division: {
    type: DataTypes.ENUM('hr', 'tech'),
    allowNull: false,
  },
}, {
  modelName: 'employees',
  timestamps: true,
});

module.exports = EmployeeModel;
