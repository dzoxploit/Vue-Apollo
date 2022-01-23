import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    employee: null,
  },
  mutations: {
    setEmployeeData: (state, payload) => {
      state.employee = payload;
    },
    isLoggedIn: (state, payload) => {
      state.isLoggedIn = payload;
    },
  },
  actions,
  getters,
});

export default store;
