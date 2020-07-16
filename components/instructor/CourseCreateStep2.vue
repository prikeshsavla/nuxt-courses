<template>
  <div>
    <!-- STEP 2 of FORM -->
    <div class="course-create-wrapper">
      <div class="course-create-headerText">
        What category best fits the knowledge you'll share?
      </div>
      <h2 class="course-create-subtitle">
        If you're not sure about the right category, you can change it later.
      </h2>
      <form class="course-create-form">
        <div class="course-create-form-group">
          <div class="course-create-form-field">
            <div class="select is-large">
              <select
                @change="emitFormData"
                v-model="form.category"
                @blur="$v.form.category.$touch()"
              >
                <option value="default">Select Category</option>
                <option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-error" v-if="$v.form.category.$dirty && !isValid">
              <span class="help is-danger">Category is required</span>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- STEP 2 END -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        category: "default",
      },
    };
  },
  validations: {
    form: {
      category: {
        required,
      },
    },
  },
  computed: {
    categories() {
      return this.$store.state.category.items;
    },
    isValid() {
      return !this.$v.form.$invalid && this.form.category !== "default";
    },
  },
  methods: {
    emitFormData() {
      this.$v.form.category.$touch();
      this.$emit("stepUpdated", {
        data: this.form,
        isValid: this.isValid,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
