export const state = () => ({
  items: [],
});

export const actions = {
  fetchCourses({ commit, state }) {
    // debugger;
    return this.$axios.$get("/api/v1/products").then((courses) => {
      // debugger;
      commit(
        "setItems",
        { resource: "course", items: { items: courses } },
        { root: true }
      );
      return state.items;
    });
  },
};
