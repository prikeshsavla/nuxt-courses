export const state = () => ({
  items: [],
});

export const actions = {
  fetchInstructorCourses({ commit }) {
    return this.$axios
      .$get("/api/v1/products/user-products")
      .then((courses) => {
        commit("setCourses", courses);
        return state.items;
      })
      .catch((error) => Promise.reject(error));
  },
  createCourse(_, formData) {
    return this.$axios
      .$post("/api/v1/products", { ...formData })
      .then(() => Promise.resolve(true))
      .catch((error) => {
        let errorMessage = "oops, something went wrong please try again";
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors.message;
        }
        return Promise.reject(errorMessage);
      });
  },
};

export const mutations = {
  setCourses(state, items) {
    state.items = items;
  },
};
