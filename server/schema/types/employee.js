const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = new GraphQLObjectType({
  name: 'EmployeeType',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    fullname: { type: GraphQLString },
    division: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});
