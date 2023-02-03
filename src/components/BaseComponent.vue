<template>
  <div class="main">
    <div class="top-components d-flex">
      <div class="switcher-container d-flex">
        <SwitcherComponent type="USD" filter-type="currency" />
        <SwitcherComponent type="EUR" filter-type="currency" />
        <SwitcherComponent type="CAD" filter-type="currency" />
      </div>
      <div class="year-container d-flex">
        <SwitcherComponent type="5" filter-type="year" />
        <SwitcherComponent type="10" filter-type="year" />
        <SwitcherComponent type="40" filter-type="year" />
      </div>
      <div class="mlx-container d-flex">
        <SwitcherComponent type="Spread" filter-type="spread" />
        <SwitcherComponent type="Yield" filter-type="spread" />
        <SwitcherComponent type="3MLSpread" filter-type="spread" />
      </div>
    </div>

    <div class="filter-container d-flex">
      <FilterComponent />
    </div>

    <TableComponent />
  </div>
</template>

<script>
import SwitcherComponent from "./SwitcherComponent.vue";
import FilterComponent from "./FilterComponent.vue";
import TableComponent from "./TableComponent.vue";
export default {
  components: { SwitcherComponent, FilterComponent, TableComponent },
  name: "BaseComponent",
};
</script>

<style lang="css">
.main {
  padding: 30px;
}

.button {
  background-color: #fff;
  color: #527094;
  border: 1px solid #527094;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.top-components {
  width: 50%;
  justify-content: space-between;
}

.button:hover {
  background-color: #fff;
  color: #527094;
  border: 1px solid #527094;
}

.button:active {
  transform: scale(0.9);
}

.button:focus {
  outline: none;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}
</style>