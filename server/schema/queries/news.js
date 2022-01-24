const { GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');

const NewsModel = require('../../database/models/news');
const NewsType = require('../types/news');

exports.findAll = {
  type: new GraphQLList(NewsType),
  resolve: async () => {
    try {
      const news = await NewsModel.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        logging: false,
      });

      return news;
    }
    catch (error0) {
      return {
        success: false,
        message: error0.message,
      }
    }
  },
}

exports.details = {
  type: NewsType,
  args: {
    newsId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const news = await NewsModel.findOne({
        where: {
          id: args.newsId,
        },
        logging: false,
      });

      return {
        success: true,
        message: 'Request received by server',
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
