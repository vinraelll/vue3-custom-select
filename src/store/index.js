import { createStore } from "vuex";
import options from "./modules/options.js";

export default createStore({
  modules: {
    options,
  },
});
