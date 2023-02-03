<template>
  <div>
    <input
      class="filter-field"
      v-model="searchTerm"
      placeholder="Filter by company name"
      v-on:keydown.enter="onSubmit"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DataService from "../services/DataService.js";

export default {
  data() {
    return {
      searchTerm: "",
    };
  },

  methods: {
    ...mapActions(["setCompanyFilter", "setData"]),
    onSubmit() {
      this.setDataFromFilter();
    },

    setDataFromFilter() {
      DataService.getData().then((response) => {
        let sortedData = this.sortByDateAndPreferredFlag(response.data.Items);
        this.setData(sortedData);
        this.setCompanyFilter(this.searchTerm);
      });
    },

    sortByDateAndPreferredFlag(arr) {
      return arr.sort((a, b) => {
        return a.DateSent - b.DateSent || b.Preffered - a.Preferred;
      });
    },
  },
};
</script>

<style lang="css" scoped>
div {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 400px;
}

.filter-field {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
}

.filter-field::placeholder {
  color: #aaa;
  font-style: italic;
}

.filter-field::-webkit-input-placeholder {
  color: #aaa;
  font-style: italic;
}

.filter-field::-moz-placeholder {
  color: #aaa;
  font-style: italic;
}
</style>