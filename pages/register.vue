<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://via.placeholder.com/300" />
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    v-model="form.username"
                    placeholder="Username"
                    @blur="$v.form.username.$touch()"
                  />
                  <div v-if="$v.form.username.$error" class="form-error">
                    <span
                      class="help is-danger"
                      v-if="!$v.form.username.required"
                      >Username is required</span
                    >
                    <span
                      class="help is-danger"
                      v-if="!$v.form.username.minLength"
                      >Username minimum length is 6 letters</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    v-model="form.name"
                    placeholder="Name"
                    @blur="$v.form.name.$touch()"
                  />
                  <div class="form-error" v-if="$v.form.name.$error">
                    <span class="help is-danger" v-if="!$v.form.name.required"
                      >Name is required</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="email"
                    v-model="form.email"
                    placeholder="Your Email"
                    @blur="$v.form.email.$touch()"
                  />
                  <div class="form-error" v-if="$v.form.email.$error">
                    <span class="help is-danger" v-if="!$v.form.email.required"
                      >Email is required</span
                    >
                    <span
                      class="help is-danger"
                      v-if="!$v.form.email.emailValidator"
                      >Email address is not valid</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    v-model="form.avatar"
                    placeholder="Avatar"
                    autocomplete=""
                    @blur="$v.form.avatar.$touch()"
                  />
                  <div class="form-error" v-if="$v.form.avatar.$error">
                    <span class="help is-danger" v-if="!$v.form.avatar.url"
                      >Url format is not valid!</span
                    >
                    <span
                      class="help is-danger"
                      v-if="!$v.form.avatar.supportedFileType"
                      >Selected file type is not valid!</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    v-model="form.password"
                    placeholder="Your Password"
                    autocomplete="new-password"
                    @blur="$v.form.password.$touch()"
                  />
                  <div class="form-error" v-if="$v.form.password.$error">
                    <span
                      class="help is-danger"
                      v-if="!$v.form.password.required"
                      >Password is required</span
                    >
                    <span
                      class="help is-danger"
                      v-if="!$v.form.password.minLength"
                      >Password minimum length is 6 letters</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    v-model="form.passwordConfirmation"
                    placeholder="Password Confirmation"
                    autocomplete="off"
                  />
                  <div
                    class="form-error"
                    v-if="$v.form.passwordConfirmation.$invalid"
                  >
                    <span
                      class="help is-danger"
                      v-if="!$v.form.passwordConfirmation.required"
                      >Password is required</span
                    >
                    <span
                      class="help is-danger"
                      v-if="!$v.form.passwordConfirmation.sameAsPassword"
                      >Password confirmation should be the same as
                      password</span
                    >
                  </div>
                </div>
              </div>
              <button
                @click.prevent="register"
                :disabled="!$v.form.invalid"
                type="submit"
                class="button is-block is-info is-large is-fullwidth"
              >
                Register
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <nuxt-link to="/login">Login</nuxt-link> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  email,
  required,
  minLength,
  sameAs,
  url,
} from "vuelidate/lib/validators";

import { supportedFileType } from "~/helpers/validators";

export default {
  middleware: "guest",
  data() {
    return {
      form: {
        username: null,
        name: null,
        email: null,
        avatar: null,
        password: null,
        passwordConfirmation: null,
      },
    };
  },
  methods: {
    register() {
      this.$v.form.$touch();
      console.log(this.form);

      this.$store
        .dispatch("auth/register", { ...this.form })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => this.$toasted.error(error));
    },
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(6),
      },
      name: {
        required,
        minLength: minLength(6),
      },
      email: {
        required,
        emailValidator: email,
      },
      avatar: {
        url,
        supportedFileType,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  height: 128px;
  width: 128px;
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
p.subtitle {
  padding-top: 1rem;
}
</style>
