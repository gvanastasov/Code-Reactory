export const initWebGL = function({ commit }, gl){
    commit('SET_GL_CONTEXT', {
        ctx: gl
    });
}