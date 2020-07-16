export const state = () => {
  return {
    items: [],
  };
};

export const actions = {
  fetchCategories({ commit, state, getters }) {
    if (getters.hasCategories) return;

    return this.$axios
      .$get("/api/v1/categories")
      .then((categories) => {
        commit("setCategories", categories);
        return state.items;
      })
      .catch((error) => Promise.reject(error));
  },
};

export const mutations = {
  setCategories(state, items) {
    state.items = items;
  },
};

export const getters = {
  hasCategories(state) {
    return state.items.length > 0;
  },
};
