<template>
  <div>
    <div class="course-create-wrapper">
      <div class="course-create-headerText">
        Please choose title of your Course.
      </div>
      <h2 class="course-create-subtitle">
        No worries, you can change title later.
      </h2>
      <form @input="emitFormData" class="course-create-form">
        <div class="course-create-form-group">
          <div class="field course-create-form-field control has-icons-right">
            <text-input-with-count
            :maxLength="50"
            :v="$v.form.title"
            v-model="form.title"
            />
            <div class="form-error" v-if="$v.form.title.$error">
              <span v-if="!$v.form.title.required" class="help is-danger"
                >Title is required</span
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import TextInputWithCount from "~/components/form/TextInputWithCount";
export default {
  components: {
    TextInputWithCount,
  },
  data() {
    return {
      form: {
        title: "",
      },
    };
  },
  methods: {
    emitFormData() {
      this.$emit("stepUpdated", {
        data: this.form,
        isValid: this.isValid,
      });
    },
  },
  computed: {
    isValid() {
      return !this.$v.form.$invalid;
    },
  },
  validations: {
    form: {
      title: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
