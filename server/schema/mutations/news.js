const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const NewsModel = require('../../database/models/news');
const NewsType = require('../types/news');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

exports.insert = {
  type: NewsType,
  args: {
    author: { type: new GraphQLNonNull(GraphQLString) },
    subject: { type: new GraphQLNonNull(GraphQLString) },
    shortDesc: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    attachment: { type: GraphQLUpload },
  },
  resolve: async (parent, args) => {
    try {
      // const news = await NewsModel.create({
      //   id: uuidv4(),
      //   ...args,
      // }, {
      //   logging: false,
      // });

      console.log(args.attachment);
      // const params = {
      //   ACL: 'public-read',
      //   Bucket: process.env.BUCKET_NAME,
      //   Body: 'www-03',
      //   Key: 'www-03',
      // }

      // const uploadAws = await s3.upload(params);
      // console.log(uploadAws);

      return {
        success: true,
        message: '',
        // ...news.dataValues,
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
