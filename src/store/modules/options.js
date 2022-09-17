import axios from "@/axios";

export default {
  state: {
    options: [],
    showErrorNotify: false,
  },
  mutations: {
    updateOptions(state, data) {
      state.options = data;
    },
    showErrorNotify(state) {
      state.showErrorNotify = true;
    },
    hideErrorNotify(state) {
      state.showErrorNotify = false;
    },
  },
  actions: {
    async fetchOptions({ commit }) {
      try {
        const { data } = await axios.get("/todos");
        commit("updateOptions", data);
      } catch (error) {
        commit("showErrorNotify");
      }
    },
  },
  getters: {
    allOptions(state) {
      return state.options;
    },
    errorNotifyFlag(state) {
      return state.showErrorNotify;
    },
  },
};
