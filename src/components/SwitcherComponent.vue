<template>
  <div>
    <button @click="setFilter" class="button" :class="{ selected: selected }">
      {{ type }}
      <span v-if="filterType === 'year'">yrs</span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import eventBus from "../event-bus";

export default {
  props: {
    type: {
      required: true,
      type: String,
    },

    filterType: {
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ["currency", "year", "spread"].includes(value);
      },
    },
  },

  data() {
    return {
      selected: false,
    };
  },

  mounted() {
    eventBus.$on("currency-changed", this.checkSelection);
    eventBus.$on("year-changed", this.checkSelection);
    eventBus.$on("spread-changed", this.checkSelection);
  },

  created() {
    this.checkSelection();
  },

  computed: {
    ...mapGetters(["getCurrency", "getYears", "getSpread"]),
  },

  methods: {
    ...mapActions([
      "setCurrencyFilter",
      "unsetYearFilter",
      "setYearFilter",
      "setSpread",
    ]),
    setFilter() {
      if (this.filterType === "currency") {
        this.setCurrencyFilterFromSwitcher();
      }

      if (this.filterType === "year") {
        this.setYearFilterFromSwitcher();
      }

      if (this.filterType === "spread") {
        this.setSpreadFilterFromSwitcher();
      }
    },

    setCurrencyFilterFromSwitcher() {
      this.setCurrencyFilter(this.type);
      eventBus.$emit("currency-changed");
    },

    setYearFilterFromSwitcher() {
      if (this.selected) {
        this.unsetYearFilter(parseInt(this.type));
        eventBus.$emit("year-changed", this.type);
      } else if (!this.selected) {
        this.setYearFilter(parseInt(this.type));
        eventBus.$emit("year-changed", this.type);
      }
    },

    setSpreadFilterFromSwitcher() {
      this.setSpread(this.type);
      eventBus.$emit("spread-changed");
    },

    checkSelection() {
      if (this.filterType === "currency") {
        if (this.type === this.getCurrency) {
          this.selected = true;
        } else {
          this.selected = false;
        }
      }

      if (this.filterType === "year") {
        if (this.getYears.includes(parseInt(this.type))) {
          this.selected = true;
        } else {
          this.selected = false;
        }
      }

      if (this.filterType === "spread") {
        if (this.type === this.getSpread) {
          this.selected = true;
        } else {
          this.selected = false;
        }
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 5px;
}
.selected {
  background-color: #527094;
  color: #fff;
  border: 1px solid #fff;
}
</style>