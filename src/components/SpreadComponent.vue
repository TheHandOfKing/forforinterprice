<template>
  <tr>
    <td></td>
    <td>{{ type }}</td>
    <td class="flex" v-if="data !== null">
      <div class="field-wraps">
        <span>
          <span>{{ filterQuoteData(data, "FIX", 0, 6)[type] }}</span>
          <span v-if="filterQuoteData(data, 'FIX', 0, 6)[type] !== null">
            <span v-if="type === 'Yield'">%</span>
            <span v-else>bp</span>
          </span>
        </span>
      </div>
      <div class="field-wraps">
        <span>
          <span>{{ filterQuoteData(data, "FRN", 0, 6)[type] }}</span>
          <span v-if="filterQuoteData(data, 'FRN', 0, 6)[type] !== null">
            <span v-if="type === 'Yield'">%</span>
            <span v-else>bp</span>
          </span>
        </span>
      </div>
    </td>
    <td class="flex" v-if="data !== null">
      <div class="field-wraps">
        <span
          ><span>{{ filterQuoteData(data, "FIX", 5, 11)[type] }}</span>
          <span v-if="filterQuoteData(data, 'FIX', 5, 11)[type] !== null">
            <span v-if="type === 'Yield'">%</span>
            <span v-else>bp</span>
          </span>
        </span>
      </div>
      <div class="field-wraps">
        <span
          ><span>{{ filterQuoteData(data, "FRN", 5, 11)[type] }}</span>
          <span v-if="filterQuoteData(data, 'FRN', 5, 11)[type] !== null">
            <span v-if="type === 'Yield'">%</span>
            <span v-else>bp</span>
          </span></span
        >
      </div>
    </td>
    <td class="flex" v-if="data !== null">
      <div class="field-wraps">
        <span
          ><span>{{ filterQuoteData(data, "FIX", 10, 41)[type] }}</span>
          <span v-if="filterQuoteData(data, 'FIX', 10, 41)[type] !== null">
            <span v-if="type === 'Yield'">%</span>
            <span v-else>bp</span>
          </span></span
        >
      </div>
      <div class="field-wraps">
        <span
          ><span>{{ filterQuoteData(data, "FRN", 10, 41)[type] }}</span>

          <span v-if="filterQuoteData(data, 'FRN', 11, 41)[type] !== null">
            <span v-if="type === 'Yield'">%</span>
            <span v-else>bp</span>
          </span>
        </span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["data", "type"],

  methods: {
    filterQuoteData(quotes, couponType, startYear, endYear) {
      if (quotes === null || quotes === []) return;

      let data = quotes.filter(
        (quote) =>
          quote.CouponType === couponType &&
          quote.Years > startYear &&
          quote.Years < endYear
      )[0];

      if (data != undefined) {
        return data;
      }
      return { Spread: null, Yield: null, "3MLSpread": null };
    },
  },
};
</script>

<style scoped>
.field-wraps {
  display: inline-block;
  width: 50%;
}
</style>