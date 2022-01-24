import { createStore } from 'vuex';
var USER = "USER";
var store = createStore({
    state: {
        user: SessionStorage.get(USER) || {}
    },
    mutations: {
        setUser: function (state, user) {
            state.user = user;
            SessionStorage.set(USER, user);
        }
    },
    actions: {},
    modules: {}
});
export default store;
//# sourceMappingURL=index.js.map