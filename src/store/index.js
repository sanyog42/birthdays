// store/index.js

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
		reducer: state => ({
			dataloaded: state.dataloaded,
			data: state.data
		})
  })],
	state: {
		loading: false,
    data: [],
    dataloaded: false,
    sel: 0,
	},
	getters: {},
	mutations: {
		load (state, payload) {
			state.loading = payload;
		},
    load_data (state, payload) {
			state.data = [];
			for(var x in payload){
				state.data.push(payload[x]);
			}
      state.dataloaded = true;
		},
    nav (state, payload) {
      state.sel = payload;
    }
	},
	actions: {}
});
