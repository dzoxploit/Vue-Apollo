const { GraphQLObjectType } = require('graphql');
const employee = require('./employee');
const news = require('./news');

const query = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    EmployeeLogin: employee.login,
    EmployeeFindOne: employee.findOne,
    NewsFindAll: news.findAll,
    NewsDetails: news.details,
  }),
});

module.exports = query;
