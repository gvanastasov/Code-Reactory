import * as actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

const state = {
    ctx: null,
    glType: ''
};

export default {
    state,
    getters,
    actions,
    mutations
}