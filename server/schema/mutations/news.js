const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const { v4: uuidv4 } = require('uuid');

const NewsModel = require('../../database/models/news');
const NewsType = require('../types/news');

exports.insert = {
  type: NewsType,
  args: {
    author: { type: new GraphQLNonNull(GraphQLString) },
    subject: { type: new GraphQLNonNull(GraphQLString) },
    shortDesc: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const news = await NewsModel.create({
        id: uuidv4(),
        ...args,
      }, {
        logging: false,
      });

      return {
        success: true,
        message: '',
        ...news.dataValues,
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

exports.delete = {
  type: NewsType,
  args: {
    newsId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const news = await NewsModel.destroy({
        where: {
          id: args.newsId,
        },
        logging: false,
      });

      return {
        success: true,
        message: 'Managed to delete news',
        ...news.dataValues,
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

exports.update = {
  type: NewsType,
  args: {
    newsId: { type: GraphQLString },
    subject: { type: GraphQLString },
    body: { type: GraphQLString },
    shortDesc: { type: GraphQLString },
    closed: { type: GraphQLBoolean },
  },
  resolve: async (parent, args) => {
    try {
      const news = await NewsModel.update({
        ...args,
      }, {
        where: {
          id: args.newsId,
        },
        logging: false,
      });

      return {
        success: true,
        message: 'Managed to update the news',
        ...news.dataValues,
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
