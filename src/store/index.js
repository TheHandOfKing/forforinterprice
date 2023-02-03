import { createStore } from 'vuex';

const state = {
  data: [],
  filterParams: {
    currency: "USD",
    years: [5, 10, 40],
    companyName: '',
  },
  spread: 'Spread'
}

const getters = {
  getData(state) {
    return state.data;
  },

  getCurrency(state) {
    return state.filterParams.currency;
  },

  getYears(state) {
    return state.filterParams.years;
  },

  getSpread(state) {
    return state.spread;
  },

  company(state) {
    return state.filterParams.companyName;
  }
}

const mutations = {
  SET_DATA(state, data) {
    state.data = data;
  },
  SORT_DATA_BY_DATE(state, operator) {
    if (operator === "asc") {
      state.data = state.data.sort((a, b) => {
        if (a.DateSent === null && b.DateSent === null) return 0;
        if (a.DateSent === null) return 1;
        if (b.DateSent === null) return -1;
        return new Date(b.DateSent) - new Date(a.DateSent) || b.Preffered - a.Preferred;
      }
      );
    }

    else if (operator === "desc") {
      state.data = state.data.sort((a, b) => {
        if (a.DateSent === null && b.DateSent === null) return 0;
        if (a.DateSent === null) return -1;
        if (b.DateSent === null) return 1;
        return new Date(a.DateSent) - new Date(b.DateSent) || b.Preffered - a.Preferred;
      }
      );
    }
  },
  SORT_DATA_BY_COMPANY(state, operator) {
    if (operator === "asc") {
      state.data = state.data.sort((a, b) => a.Company.localeCompare(b.Company));
    }
    else if (operator === "desc") {
      state.data = state.data.sort((a, b) => b.Company.localeCompare(a.Company));
    }
  },
  SET_FILTER_PARAMS_CURRENCY(state, data) {
    state.filterParams.currency = data;
  },
  SET_FILTER_PARAMS_YEAR(state, data) {
    if (data === 5) {
      state.filterParams.years.unshift(data);
    }
    if (data === 10) {
      if (state.filterParams.years[0] === 5)
        state.filterParams.years.push(data)
      else
        state.filterParams.years.unshift(data)
    }
    if (data === 40) {
      state.filterParams.years.push(data);
    }
  },
  SET_FILTER_PARAMS_COMPANY(state, data) {
    state.filterParams.companyName = data;
  },
  UNSET_FILTER_PARAMS_YEAR(state, data) {
    let index = state.filterParams.years.indexOf(data);
    state.filterParams.years.splice(index, 1);
  },
  SET_SPREAD(state, data) {
    state.spread = data;
  }
}
const actions = {
  setData(context, data) {
    context.commit('SET_DATA', data);
  },

  setCompanyFilter(context, data) {
    context.commit('SET_FILTER_PARAMS_COMPANY', data);

    let filterData = state.data.filter(q => q.Company.includes(data));
    context.commit('SET_DATA', filterData);
  },

  setCurrencyFilter(context, data) {
    context.commit('SET_FILTER_PARAMS_CURRENCY', data);
  },

  setYearFilter(context, data) {
    context.commit('SET_FILTER_PARAMS_YEAR', data);
  },

  unsetYearFilter(context, data) {
    context.commit('UNSET_FILTER_PARAMS_YEAR', data);
  },

  setSpread(context, data) {
    context.commit('SET_SPREAD', data);
  },

  sortDataByDate({ commit }, data) {
    commit("SORT_DATA_BY_DATE", data);
  },

  sortDataByCompany({ commit }, data) {
    commit('SORT_DATA_BY_COMPANY', data);
  },

  applyFilters({ commit, state }) {
    let data = state.data;
    for (let item of data) {
      if (item.Quote === null) continue;

      item.Quote = item.Quote.filter(q => q.Currency === state.filterParams.currency);
      if (state.filterParams.years.length === 3) {

        item.Quote = item.Quote.filter(q => q.Years >= 0 && q.Years <= state.filterParams.years[state.filterParams.years.length - 1]);
      }
      else if (state.filterParams.years.length === 2) {
        item.Quote = item.Quote.filter(q => q.Years >= state.filterParams.years[0] && q.Years <= state.filterParams.years[state.filterParams.years.length - 1]);
      }
      else {
        item.Quote = item.Quote.filter(q => q.Years <= state.filterParams.years[0]);
      }
    }
    commit('SET_DATA', data);
  },
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})