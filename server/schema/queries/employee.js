const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../../helpers/auth');
const EmployeeModel = require('../../database/models/employee');
const EmployeeType = require('../types/employee');

exports.login = {
  type: EmployeeType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const employee = await EmployeeModel.findOne({
        where: {
          email: args.email,
        },
        logging: false,
      });

      if (!employee) {
        const newError = {
          message: 'Email is not registered',
        }
        throw newError;
      }

      const compare = await bcrypt.compare(args.password, employee.password);

      if (!compare) {
        const newError = {
          message: 'Password doesn\'t match',
        }
        throw newError;
      }

      const token = await jwt.sign({ employeeId: employee.id }, process.env.JWT_PRIVATE_TOKEN);

      return {
        success: true,
        message: 'Login successfully',
        token,
        ...employee.dataValues,
      }
    }
    catch (error0) {
      return {
        success: false,
        message: error0.message,
      }
    }
  },
}

exports.findOne = {
  type: EmployeeType,
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const check = await auth(args.token);

      const employee = await EmployeeModel.findOne({
        where: {
          id: check.employeeId,
        },
        logging: false,
      });

      return {
        success: true,
        message: '',
        ...employee.dataValues,
      }
    }
    catch (error0) {
      return {
        success: false,
        message: error0.message,
      }
    }
  },
}
