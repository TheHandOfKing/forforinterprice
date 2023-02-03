<script setup>
import { computed, ref } from "vue";
import dataJSON from "./data/data.json";

const data = ref(dataJSON);
const filteredCompaniesInput = ref("");

const currencies = ["usd", "eur", "cad"];
const years = [5, 10, 40];
const stvari = ["Spread", "Yield", "3MLSpread"];

const activeCurrency = ref("usd");
const activeYears = ref([5, 10, 40]);
const activeStvar = ref("Spread");

const formatDate = (date) => {
  if (!date) return;
  const dateFormat = new Date(date);
  return dateFormat.toLocaleString("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const setActiveCurrency = (e) => {
  const btns = document.querySelectorAll('.currencies button')
  activeCurrency.value = e.target.dataset.currency;
  btns.forEach(btn => btn.classList.remove('btn-active'))
  e.target.classList.add('btn-active')
}

const toggleActiveYear = ({target}) => {
  const year = parseInt(target.dataset.year)
  if(activeYears.value.includes(year)) activeYears.value = activeYears.value.filter(y => y != year)
  else activeYears.value.push(year)

  target.classList.toggle('btn-active')
}

const setActiveStvar = (e) => {
  const btns = document.querySelectorAll('.stvari button')
  activeStvar.value = e.target.innerText
  btns.forEach(btn => btn.classList.remove('btn-active'))
  e.target.classList.add('btn-active')
}

const filteredSortedCompanies = computed(() => {
  // const sortedCompanies = data.value.Items.sort((a, b) => {
  //   if (a.DateSent === b.DateSent) return 0;
  //   return a.DateSent > b.DateSent ? 1 : -1;
  // }).sort((a, b) => {
  //   return parseInt(a.Preferred) - parseInt(b.Preferred)
  // });

  if (filteredCompaniesInput.value.length < 3) return data.value.Items;

  return data.value.Items.filter((cat) =>
    cat.Company.toLowerCase().includes(
      filteredCompaniesInput.value.toLowerCase()
    )
  );
});

const getDataByYear = (quote, floor, ceil = null, coupon_type = null) => {
  if(quote === null) return []

  const neznam = quote.filter(q => q.Years <= floor && q.Currency === activeCurrency.value.toUpperCase() && q.CouponType === coupon_type)

  if(ceil === null) return neznam

  return quote.filter(q => q.Years >= floor && q.Years <= ceil && q.Currency === activeCurrency.value.toUpperCase() && q.CouponType === coupon_type)
}

</script>

<template>
  <div class="upper-menu">
    <div class="currencies">
      <button
        class="btn"
        v-for="(currency, i) in currencies"
        :key="currency"
        :data-currency="currency"
        @click="setActiveCurrency"
        :class="{ 'btn-active' : i == 0 }"
      >
        {{ currency.toUpperCase() }}
      </button>
    </div>
    <div class="years">
      <button class="btn btn-active" v-for="year in years" :key="year" @click="toggleActiveYear" :data-year="year">
        {{ year + " YRS" }}
      </button>
    </div>
    <div class="stvari">
      <button class="btn" v-for="(stvar, i) in stvari" :key="stvar" @click="setActiveStvar" :class="{ 'btn-active' : i == 0 }">
        {{ stvar }}
      </button>
    </div>
  </div>
  <input
    type="text"
    v-model="filteredCompaniesInput"
    placeholder="Filter by company name ..."
  />
  <table>
    <tr>
      <th>Date sent</th>
      <th>Company</th>
      <th class="flex">
        <div class="field-wrap">
          <span>FIX</span>
          <span>FRN</span>
        </div>
      </th>
      <th class="flex">
        <div class="field-wrap">
          <span>FIX</span>
          <span>FRN</span>
        </div>
      </th>
      <th class="flex">
        <div class="field-wrap">
          <span>FIX</span>
          <span>FRN</span>
        </div>
      </th>
    </tr>
    <tr v-for="row in filteredSortedCompanies" :key="row.Id">
      <td>{{ formatDate(row.DateSent) }}</td>
      <td :class="{ bolded: row.Quote }">
        {{ row.Company }}
        {{ row.Preferred }}
      </td>
      <td class="flex">
        <div class="field-wrap" v-if="activeYears.includes(5)">
          <span>1</span>
          <span>2</span>
        </div>
      </td>
      <td class="flex">
        <div class="field-wrap" v-if="activeYears.includes(10)">
          <span>3</span>
          <span>4</span>
        </div>
      </td>
      <td class="flex">
        <div class="field-wrap" v-if="activeYears.includes(40)">
          <span>5</span>
          <span>6</span>
        </div>
      </td>
    </tr>
    <tfoot>
      <tr>
        <td></td>
        <td>Average by Spread</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
.upper-menu {
  display: flex;
}
.upper-menu > * {
  display: flex;
  gap: 0 0.5rem;
}

.upper-menu > * + * {
  margin-left: 3rem;
}

input {
  padding: 0.5rem 1rem;
  min-width: 15rem;
  margin: 1rem 0;
}

table {
  width: 100%;
  text-align: left;
  border-collapse: collapse; 
}

table tr {
  border-bottom: 1px solid #b4b4b4;
}

table th {
  border-bottom: 1px solid #000;
}

table tr td.bolded {
  font-weight: bold;
}

table tr td.flex .field-wrap,
table tr th.flex .field-wrap {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

table tr th.flex .field-wrap {
  border-top: 1px solid #000;
}

table tr td.flex span {
  width: 40%;
}

table tr th:first-child,
table tr td:first-child {
  padding: 0 1rem;
}

table tfoot {
  border: 2px solid #000;
}

.btn-active {
  background: #292961;
  color: #fff;
}
</style>
