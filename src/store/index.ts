import Vue from 'vue';
import Vuex from 'vuex';
import State from './state';
import * as Mutations from './mutations';
import * as Actions from './actions';
import * as Getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state: new State(),
    mutations: Mutations,
    actions: Actions,
    getters: Getters,
});
