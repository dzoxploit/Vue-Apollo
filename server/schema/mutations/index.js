const { GraphQLObjectType } = require('graphql');
const news = require('./news');
const employee = require('./employee');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    EmployeeRegister: employee.register,
    CreateNews: news.insert,
    UpdateNews: news.update,
    DeleteNews: news.delete,
  }),
});

module.exports = mutation;
