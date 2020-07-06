export const mutations = {
  setItems(state, { resource, items }) {
    state[resource] = items;
  },
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch("auth/getAuthUser").catch(() =>
      console.log("Not Authenticated")
    );
  },
};
