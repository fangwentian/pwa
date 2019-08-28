import Vue from 'vue';
import Vuex from 'vuex';
Vue.config.devtools = true;

Vue.use(Vuex);

// 公共部分
const state = {
    routeMeta: {
        pageTitle: '',
        noCard: false
    }
}

const actions = {
    setRouteMeta({commit, state}, payload) {
        commit('setRouteMeta', payload)
    }
}

const mutations = {
    setRouteMeta(state, payload) {
        Object.assign(state.routeMeta, payload)
    }
}

const getters = {}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: {

    },
    strict: false
});