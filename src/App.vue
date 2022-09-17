<template>
  <div class="wrapper">
    <CustomSelect label="Custom Select" :options="allOptions" />

    <transition name="slideInOut">
      <ErrorNotify v-if="errorNotifyFlag" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import CustomSelect from "./components/CustomSelect.vue";
import ErrorNotify from "./components/ErrorNotify.vue";

export default {
  name: "App",
  components: {
    CustomSelect,
    ErrorNotify,
  },
  computed: {
    ...mapGetters(["allOptions", "errorNotifyFlag"]),
  },
  created() {
    this.fetchOptions();
  },
  methods: {
    ...mapActions(["fetchOptions"]),
    ...mapMutations(["hideErrorNotify"]),
    hideNotify() {
      this.hideErrorNotify();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 100vh;
  padding-top: 100px;
}

// transition
.slideInOut-enter-from {
  transform: translateX(100px);
  opacity: 0;
}
.slideInOut-enter-to {
  opacity: 1;
}
.slideInOut-enter-active {
  transition: all 0.5s ease;
}
.slideInOut-leave-from {
  opacity: 1;
}
.slideInOut-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.slideInOut-leave-active {
  transition: all 0.5s ease;
}
</style>
