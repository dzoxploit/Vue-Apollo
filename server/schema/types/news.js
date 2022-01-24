const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = new GraphQLObjectType({
  name: 'NewsType',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    subject: { type: GraphQLString },
    shortDesc: { type: GraphQLString },
    body: { type: GraphQLString },
    attachment: { type: GraphQLString },
    closed: { type: GraphQLBoolean },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});
