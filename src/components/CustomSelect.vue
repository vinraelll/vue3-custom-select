<template>
  <h1>{{ label }}</h1>

  <div class="chosen">
    <div v-if="optionIsChosen" class="chosen__option">
      Chosen:
      <span>{{ currentOptionTitle }}</span>
    </div>
    <div v-else class="chosen__option">Item hasn't chosen</div>
  </div>

  <div class="select">
    <div class="select__form">
      <input
        v-model="currentOptionTitle"
        class="select__input"
        type="text"
        autocomplete="off"
        :placeholder="placeholder"
        @input="filterOptions"
        @focus="onFocus"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
      />
      <button v-if="currentOptionTitle" class="select__reset" @click="onReset">
        <img src="@/assets/delete-icon.svg" alt="Clean input field" />
      </button>
    </div>

    <ul v-if="filteredOptions && isDropdownShown" class="select__options">
      <li
        v-for="(option, i) in filteredOptions"
        :key="option.id"
        :class="{ 'is-active': i === optionCounter }"
        class="select__option"
        @click="setOption(option.title)"
      >
        {{ option.title }}
      </li>
    </ul>

    <div v-if="optionNotFound" class="select__not-found">No data available</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CustomSelect",
  props: {
    placeholder: {
      type: String,
      default: "And let option will be chosen..",
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      currentOptionTitle: "",
      filteredOptions: [],
      isDropdownShown: false,
      optionNotFound: false,
      optionIsChosen: false,
      optionCounter: -1,
    };
  },
  computed: {
    ...mapGetters(["allOptions"]),
  },
  mounted() {
    // hide the dropdown list of options by clicking anywhere in the window other than the input field
    document.body.addEventListener("click", (e) => {
      const input = document.querySelector(".select__input");

      if (e.target != input) {
        this.hideOptions();
      }

      return;
    });
  },
  unmounted() {
    document.body.removeEventListener("click", function () {});
  },
  methods: {
    onFocus() {
      this.isDropdownShown = true;
      this.filterOptions();
    },
    filterOptions() {
      this.filteredOptions = this.allOptions.filter((option) => {
        return option.title
          .toLowerCase()
          .includes(this.currentOptionTitle.toLowerCase());
      });

      if (this.filteredOptions.length === 0) {
        this.optionNotFound = true;
      } else {
        this.optionNotFound = false;
      }

      if (this.optionNotFound) {
        this.isDropdownShown = false;
      } else {
        this.isDropdownShown = true;
      }

      this.optionCounter = -1;
    },
    setOption(title) {
      this.currentOptionTitle = title;
      this.filterOptions();
      this.isDropdownShown = false;
      this.optionIsChosen = true;
    },
    hideOptions() {
      this.isDropdownShown = false;
    },
    onReset() {
      if (!this.currentOptionTitle) {
        return;
      }

      this.currentOptionTitle = "";
      this.optionIsChosen = false;
      this.filterOptions();
    },
    // keydown handlers
    onArrowDown() {
      if (
        this.optionCounter < this.filteredOptions.length &&
        this.optionCounter !== this.filteredOptions.length - 1
      ) {
        this.optionCounter = this.optionCounter + 1;
      }
    },
    onArrowUp() {
      if (this.optionCounter > 0) {
        this.optionCounter = this.optionCounter - 1;
      }
    },
    onEnter() {
      if (this.optionIsChosen) {
        return;
      }

      const currentOption = +this.optionCounter;

      this.currentOptionTitle = this.filteredOptions[currentOption].title;
      this.optionCounter = -1;
      this.isDropdownShown = false;
      this.optionIsChosen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  display: block;
  text-align: center;
}

.chosen {
  &__option {
    margin: 10px auto 20px;
    text-align: center;
    font-size: 24px;
  }

  & span {
    color: yellowgreen;
    text-decoration: underline;
  }
}

.select {
  width: 300px;
  margin: 0 auto;

  &__form {
    position: relative;
  }

  &__input {
    width: 100%;
    margin-bottom: 4px;
    padding: 5px 30px 5px 10px;
  }

  &__reset {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 22px;
    height: 22px;
    font-size: 0;
    background: none;
    cursor: pointer;

    &:hover {
      transform: rotate(180deg);
    }
  }

  &__options {
    margin: 0;
    height: 400px;
    overflow-y: scroll;
  }

  &__option {
    padding: 2px;
    text-align: center;
    font-size: 22px;
    background: teal;
    transition: color, background 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 3px;
    }

    &:hover {
      color: #000;
      background: #e7e7e7;
    }

    &.is-active {
      color: #000;
      background: #e7e7e7;
    }
  }

  &__not-found {
    margin-bottom: 5px;
    font-size: 22px;
    text-align: center;
  }
}
</style>
