import Vue from 'vue';
import VueRouter from 'vue-router';
import Fragment from 'vue-fragment';
import ApolloClient from 'apollo-client';
import VueApollo from 'vue-apollo';
import { createUploadLink } from 'apollo-upload-client';

import router from './router/index';
import App from './app.vue';
import store from './store/index';

Vue.use(VueRouter);
Vue.use(Fragment.Plugin);
Vue.use(VueApollo);

Vue.config.errorHandler = (err) => {
  console.log(err.message);
};

const isDev = process.env.NODE_ENV === 'development';
const apolloClient = new ApolloClient({
  link: createUploadLink({ uri: isDev ? 'http://localhost:8080/graphql' : '/graphql' }),
  cache: new ApolloClient().in,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  render: (element) => element(App),
  router,
  store,
  apolloProvider,
}).$mount('#root');
