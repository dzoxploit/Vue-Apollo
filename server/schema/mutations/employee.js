const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const EmployeeModel = require('../../database/models/employee');
const EmployeeType = require('../types/employee');

exports.register = {
  type: EmployeeType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    fullname: { type: new GraphQLNonNull(GraphQLString) },
    division: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const enc = await bcrypt.hash(args.password, await bcrypt.genSalt(10));

      const employee = await EmployeeModel.create({
        id: uuidv4(),
        email: args.email,
        fullname: args.fullname,
        division: args.division,
        password: enc,
      }, {
        logging: false,
      });

      return {
        success: true,
        message: 'Successfully created account',
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
