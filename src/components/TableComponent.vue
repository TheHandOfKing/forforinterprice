<template>
  <div>
    <table>
      <tr>
        <th
          class="sortable text-left"
          @click="sortBy('dateSent', 'first-arrow')"
        >
          Date Sent
          <span
            ><svg
              aria-rotated="true"
              fill="#000000"
              height="15px"
              width="15px"
              version="1.1"
              id="first-arrow"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xml:space="preserve"
              class="arrows"
            >
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              /></svg
          ></span>
        </th>
        <th
          class="sortable text-left"
          @click="sortBy('companyName', 'second-arrow')"
        >
          <p>
            Company
            <span
              ><svg
                aria-rotated="false"
                id="second-arrow"
                fill="#000000"
                height="15px"
                width="15px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xml:space="preserve"
                class="arrows"
              >
                <path
                  id="XMLID_225_"
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                /></svg
            ></span>
          </p>
        </th>
        <th class="flex">
          <div class="years">5 YRS</div>
          <div class="field-wrap bottom">
            <span>FIX</span>
            <span>FRN</span>
          </div>
        </th>
        <th class="flex">
          <div class="years">10 YRS</div>
          <div class="field-wrap bottom">
            <span>FIX</span>
            <span>FRN</span>
          </div>
        </th>
        <th class="flex">
          <div class="years">40 YRS</div>
          <div class="field-wrap bottom">
            <span>FIX</span>
            <span>FRN</span>
          </div>
        </th>
      </tr>
      <tr>
        <td>
          <table v-for="(row, upperIndex) in getData" :key="upperIndex">
            <tr :class="[row.Id, { sortable: row.DateSent !== null }]">
              <td
                @click="setQuote(row.Quote)"
                class="text-left"
                ref="spreadContainer"
              >
                <svg
                  v-if="row.DateSent !== null"
                  aria-rotated="true"
                  fill="#000000"
                  height="15px"
                  width="15px"
                  version="1.1"
                  id="first-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xml:space="preserve"
                  class="arrows"
                >
                  <path
                    id="XMLID_225_"
                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                  /></svg
                >{{ formatDate(row.DateSent) }}
              </td>
              <td :class="{ bolded: row.Quote }" class="text-left">
                {{ row.Company }}
              </td>

              <td class="flex" v-if="row.Quote !== null">
                <div class="field-wraps">
                  <span :class="'column-0' + ' row-' + upperIndex">
                    <span>{{
                      filterQuoteData(row, "FIX", 0, 6)[getSpread]
                    }}</span>
                    <span
                      v-if="
                        filterQuoteData(row, 'FIX', 0, 6)[getSpread] !== null
                      "
                    >
                      <span v-if="getSpread === 'Yield'">%</span>
                      <span v-else>bp</span>
                    </span>
                  </span>
                </div>
                <div class="field-wraps">
                  <span :class="'column-1' + ' row-' + upperIndex">
                    <span>{{
                      filterQuoteData(row, "FRN", 0, 6)[getSpread]
                    }}</span>
                    <span
                      v-if="
                        filterQuoteData(row, 'FRN', 0, 6)[getSpread] !== null
                      "
                    >
                      <span v-if="getSpread === 'Yield'">%</span>
                      <span v-else>bp</span>
                    </span>
                  </span>
                </div>
              </td>
              <td class="flex" v-if="row.Quote !== null">
                <div class="field-wraps">
                  <span :class="'column-2' + ' row-' + upperIndex"
                    ><span>{{
                      filterQuoteData(row, "FIX", 5, 11)[getSpread]
                    }}</span>
                    <span
                      v-if="
                        filterQuoteData(row, 'FIX', 5, 11)[getSpread] !== null
                      "
                    >
                      <span v-if="getSpread === 'Yield'">%</span>
                      <span v-else>bp</span>
                    </span>
                  </span>
                </div>
                <div class="field-wraps">
                  <span :class="'column-3' + ' row-' + upperIndex"
                    ><span>{{
                      filterQuoteData(row, "FRN", 5, 11)[getSpread]
                    }}</span>
                    <span
                      v-if="
                        filterQuoteData(row, 'FRN', 5, 11)[getSpread] !== null
                      "
                    >
                      <span v-if="getSpread === 'Yield'">%</span>
                      <span v-else>bp</span>
                    </span></span
                  >
                </div>
              </td>
              <td class="flex" v-if="row.Quote !== null">
                <div class="field-wraps">
                  <span :class="'column-4' + ' row-' + upperIndex"
                    ><span>{{
                      filterQuoteData(row, "FIX", 10, 41)[getSpread]
                    }}</span>
                    <span
                      v-if="
                        filterQuoteData(row, 'FIX', 10, 41)[getSpread] !== null
                      "
                    >
                      <span v-if="getSpread === 'Yield'">%</span>
                      <span v-else>bp</span>
                    </span></span
                  >
                </div>
                <div class="field-wraps">
                  <span :class="'column-5' + ' row-' + upperIndex"
                    ><span>{{
                      filterQuoteData(row, "FRN", 10, 41)[getSpread]
                    }}</span>
                    <span
                      v-if="
                        filterQuoteData(row, 'FRN', 11, 40)[getSpread] !=
                        undefined
                      "
                    >
                      <span v-if="getSpread === 'Yield'">%</span>
                      <span v-else>bp</span>
                    </span>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="selectedQuote == row.Quote">
              <spread-component
                v-if="row.Quote !== null"
                :type="types[0]"
                :data="row.Quote"
              ></spread-component>
              <spread-component
                v-if="row.Quote !== null"
                :type="types[1]"
                :data="row.Quote"
              ></spread-component>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="tfoot" v-if="isDataLoaded">
      <div class="tfoot-holder">
        <div style="margin-left: 100px">Average by Spread</div>
        <div class="data-holder">
          <span
            ><span v-if="getSpread !== 'Yield'">+</span
            >{{ calculateAverage("column-0")
            }}<span v-if="getSpread !== 'Yield'">bp</span
            ><span v-if="getSpread === 'Yield'">%</span></span
          >
          <span
            ><span v-if="getSpread !== 'Yield'">+</span
            >{{ calculateAverage("column-1")
            }}<span v-if="getSpread !== 'Yield'">bp</span
            ><span v-if="getSpread === 'Yield'">%</span></span
          >
          <span
            ><span v-if="getSpread !== 'Yield'">+</span
            >{{ calculateAverage("column-2")
            }}<span v-if="getSpread !== 'Yield'">bp</span
            ><span v-if="getSpread === 'Yield'">%</span></span
          >
          <span
            ><span v-if="getSpread !== 'Yield'">+</span
            >{{ calculateAverage("column-3")
            }}<span v-if="getSpread !== 'Yield'">bp</span
            ><span v-if="getSpread === 'Yield'">%</span></span
          >
          <span
            ><span v-if="getSpread !== 'Yield'">+</span
            >{{ calculateAverage("column-4")
            }}<span v-if="getSpread !== 'Yield'">bp</span
            ><span v-if="getSpread === 'Yield'">%</span></span
          >
          <span
            ><span v-if="getSpread !== 'Yield'">+</span
            >{{ calculateAverage("column-5")
            }}<span v-if="getSpread !== 'Yield'">bp</span
            ><span v-if="getSpread === 'Yield'">%</span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import moment from "moment";
import DataService from "../services/DataService.js";
import SpreadComponent from "./SpreadComponent.vue";
import { mapActions, mapGetters } from "vuex";
import eventBus from "../event-bus";

export default {
  data() {
    return {
      data: [],
      activeYears: [5, 10, 40],
      dateSortClicked: true,
      companySortClicked: false,
      isDataLoaded: false,
      isClicked: false,
      selectedQuote: {},
      types: [],
      sortOrders: {
        DateSent: 1,
        CompanyName: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["getData", "getSpread"]),
  },

  components: {
    SpreadComponent,
  },

  mounted() {
    eventBus.$on("currency-changed", this.applyFiltersFromTable);
    eventBus.$on("year-changed", this.applyFiltersFromTable);
    eventBus.$on("spread-changed", this.applyFiltersFromTable);
    this.resetData();
    this.checkArrows();
    setTimeout(() => {
      this.types =
        this.getSpread == "Spread"
          ? ["Yield", "3MLSpread"]
          : this.getSpread === "Yield"
          ? ["Spread", "3MLSpread"]
          : ["Spread", "Yield"];
      this.isDataLoaded = true;
      for (let i = 0; i < this.getData.length; i++) {
        this.highlightMinimum(`row-${i}`);
      }
    }, 500);
  },

  methods: {
    ...mapActions([
      "setData",
      "applyFilters",
      "sortDataByDate",
      "sortDataByCompany",
    ]),

    applyFiltersFromTable() {
      this.resetData();
      this.applyFilters();
      setTimeout(() => {
        this.types =
          this.getSpread == "Spread"
            ? ["Yield", "3MLSpread"]
            : this.getSpread === "Yield"
            ? ["Spread", "3MLSpread"]
            : ["Spread", "Yield"];
        for (let i = 0; i < this.getData.length; i++) {
          this.highlightMinimum(`row-${i}`);
        }
      }, 100);
    },

    filterQuoteData(row, couponType, startYear, endYear) {
      if (row.Quote === null || row.Quote === []) return;

      let data = row.Quote.filter(
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

    resetData() {
      DataService.getData().then((response) => {
        this.data = response.data.Items;
        this.setData(this.data);
        this.sortDataByDate("asc");
        this.applyFilters();
      });
    },

    formatDate(date) {
      if (date === null) return "";
      return moment(new Date(date)).format("DD-MMM-YY");
    },

    highlightMinimum(rows) {
      let allRows = document.getElementsByClassName(rows);
      if (allRows.length === 0) return "";
      let elements = [];

      for (let row of allRows) {
        row.children[0].style.backgroundColor = "#fff";
        if (row.children[1]) {
          row.children[1].style.backgroundColor = "#fff";
        }
        if (row.children[0].innerHTML !== "") {
          elements.push(parseFloat(row.children[0].innerHTML));
        }
      }

      let min = Math.min(...elements);

      for (let row of allRows) {
        if (row.children[0].innerHTML == min) {
          console.log(row.children[0].innerHTML);
          row.children[0].style.backgroundColor = "#f4f2d9";
          row.children[1].style.backgroundColor = "#f4f2d9";
          row.children[0].style.padding = "5px";
          row.children[1].style.padding = "5px";
        }
      }
    },

    calculateAverage(columns) {
      let allCols = document.getElementsByClassName(columns);
      if (allCols.length === 0) return "";
      let elements = [];
      for (let column of allCols) {
        if (column.children[0].innerHTML !== "")
          elements.push(parseFloat(column.children[0].innerHTML));
      }
      let sum = elements.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
      let avg = parseFloat(sum.toFixed(3) / parseFloat(elements.length));
      if (avg.toFixed(3) === "NaN") return 0;

      if (this.getSpread !== "Yield") {
        return Math.round(avg);
      } else return avg.toFixed(3);
    },

    checkArrows() {
      let arrows = document.getElementsByClassName("arrows");
      for (let arrow of arrows) {
        if (arrow.getAttribute("aria-rotated") === "true") {
          arrow.style.transform = "rotate(0deg)";
          arrow.setAttribute("aria-rotated", false);
        } else {
          arrow.style.transform = "rotate(180deg)";
          arrow.setAttribute("aria-rotated", true);
        }
      }
    },

    rotateArrow(arrow) {
      let itemToRotate = document.getElementById(arrow);

      if (itemToRotate.getAttribute("aria-rotated") === "true") {
        itemToRotate.style.transform = "rotate(0deg)";
        itemToRotate.setAttribute("aria-rotated", false);
      } else {
        itemToRotate.style.transform = "rotate(180deg)";
        itemToRotate.setAttribute("aria-rotated", true);
      }
    },

    sortBy(key, arrow) {
      this.rotateArrow(arrow);
      if (key === "dateSent") {
        if (this.dateSortClicked) {
          this.sortDataByDate("desc");
          this.dateSortClicked = false;
        } else {
          this.sortDataByDate("asc");
          this.dateSortClicked = true;
        }
      }

      if (key === "companyName") {
        if (this.companySortClicked) {
          this.sortDataByCompany("asc");
          this.companySortClicked = false;
        } else {
          this.sortDataByCompany("desc");
          this.companySortClicked = true;
        }
      }
    },

    expandRows(quote) {
      for (let type of this.types) {
        const component = this.$createElement(SpreadComponent, {
          props: {
            type: type,
            data: quote,
          },
        });
        this.$refs.componentContainer.insertAdjacentElement(
          "afterend",
          component.vnode.elm
        );
      }
    },

    setQuote(quote) {
      if (this.isClicked) {
        this.selectedQuote = {};
        this.isClicked = false;
        return;
      }
      this.isClicked = true;
      this.selectedQuote = quote;
    },
  },
};
</script>

<style scoped>
.sortable {
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}

.sortable:not(:first-child) {
  margin-left: 20px;
}

p {
  width: 100%;
  text-align: left;
}

.sortable span {
  height: 15px;
}

.sortable span svg {
  transition: 0.3s all ease;
}

.bottom {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.years {
  border-bottom: 1px solid #303030;
  padding-bottom: 4px;
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
}

.fix-frn {
  width: 200px;
  margin-left: 30px;
}

.text-left {
  text-align: left;
}

.spread-component {
  display: flex;
  flex-direction: column;
}

table {
  width: 70%;
  border-collapse: collapse;
}

table tr {
  border-bottom: 1px solid #b4b4b4;
}

table th {
  border-bottom: 1px solid #000;
}

table .field-wrap span {
  margin-left: 0;
}

.field-wraps {
  display: inline-block;
  width: 50%;
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

table tr td.flex .field-wrap {
  justify-content: space-between;
  width: 50%;
}

table tr td.flex span span:first-child {
  width: 50px;
  display: inline-block;
}

table tr td.flex span span:last-child {
  width: 20px;
  display: inline-block;
}

table tr th:first-child,
table tr td:first-child {
  padding: 0 1rem;
}

.tfoot .tfoot-holder {
  display: flex;
  justify-content: space-between;
}

.tfoot .tfoot-holder .data-holder {
  width: 60%;
  display: flex;
  justify-content: space-between;
}

div.tfoot {
  border: 2px solid #000;
  width: 70%;
}
</style>