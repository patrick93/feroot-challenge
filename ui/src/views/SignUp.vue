<template>
  <div class="sign-up">
    <h4>Please Sign Up</h4>
    <form>
      <div class="mb-3">
        <label for="nameInput" class="form-label">Name</label>
        <input
          type="text"
          id="nameInput"
          class="form-control"
          :class="{ 'is-invalid': $v.name.$error }"
          v-model.trim="$v.name.$model"
        />
        <div v-if="!$v.name.$required" class="invalid-feedback">
          Name is required
        </div>
      </div>
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email</label>
        <input
          type="email"
          id="emailInput"
          class="form-control"
          v-model.trim="$v.email.$model"
          :class="{ 'is-invalid': $v.email.$error }"
        />
        <div
          v-if="!$v.email.$required || !$v.email.$email"
          class="invalid-feedback"
        >
          Invalid email
        </div>
      </div>
      <div class="mb-3">
        <label for="passwordInput" class="form-label">Password</label>
        <input
          type="password"
          id="passwordInput"
          class="form-control"
          v-model="$v.password.$model"
          :class="{ 'is-invalid': $v.password.$error }"
        />
        <div v-if="!$v.password.$required" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="mb-3">
        <label for="repeatPasswordInput" class="form-label">Repeat Password</label>
        <input
          type="password"
          id="repeatPasswordInput"
          class="form-control"
          v-model="$v.repeatPassword.$model"
          :class="{ 'is-invalid': $v.repeatPassword.$error }"
        />
        <div v-if="!$v.repeatPassword.$required" class="invalid-feedback">
          Passwords must be identical.
        </div>
      </div>
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onSignUpHandler"
        :disabled="($v.$anyDirty && $v.$invalid) || loading"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        <span v-else>Sign Up</span>
      </button>
    </form>
    <div class="mb-3">
      Already have an account?
      <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import authService from "../services/auth.service";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      serverErrorMessage: "",
      loading: false
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      email,
      required,
    },
    password: {
      required,
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    async onSignUpHandler() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          await authService.signUp({
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.$router.push({
            name: "sign-in",
            params: { userRegisteredSuccessfully: true },
          });
        } catch (error) {
          if (error.response.status === 409) {
            this.serverErrorMessage = "Email already registered";
          } else {
            this.serverErrorMessage =
              "Something unexpected happened. Please try again";
          }
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sign-up {
  form {
    text-align: left;
    margin-bottom: 1rem;
  }

  .server-error-message {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: $red;
    margin-bottom: 1rem;
  }
}
</style>
