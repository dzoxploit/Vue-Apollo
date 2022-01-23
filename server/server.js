require('dotenv').config({
  path: './.env',
});

const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const port = 8080 || process.env.PORT;
app.listen(port);

console.log(`[${port}] server running...`);
