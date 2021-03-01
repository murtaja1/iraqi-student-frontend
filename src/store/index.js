import Vue from "vue";
import Vuex from "vuex";
import tokenModel from './tokenModel'


Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    tokenModel
  }
});
