<template>
  <aside class="notify">
    <div class="notify__title">
      <span class="notify__title-text">Error</span>
    </div>

    <div class="notify__text">An error has occured</div>

    <div class="notify__close">
      <button class="notify__close-btn" @click="closeNotify">Close</button>
    </div>
  </aside>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ErrorNotify",
  methods: {
    ...mapMutations(["hideErrorNotify"]),
    closeNotify() {
      this.hideErrorNotify();
    },
  },
};
</script>

<style lang="scss" scoped>
.notify {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 250px;
  color: #000;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;

  &__title {
    padding: 5px;
    background: red;

    &-text {
      position: relative;
      padding-left: 25px;
      color: #fff;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background-image: url("@/assets/error-icon.svg");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }

  &__text {
    padding: 5px 10px;
    border-bottom: 1px solid teal;
  }

  &__close {
    display: flex;
    justify-content: flex-end;
    padding: 10px;

    &-btn {
      padding: 4px 10px;
      border: 1px solid #000;
      border-radius: 5px;

      &:hover {
        background: teal;
        color: #fff;
      }
    }
  }
}
</style>
