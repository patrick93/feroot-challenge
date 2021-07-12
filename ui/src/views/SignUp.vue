<template>
  <div class="sign-up">
    <h3 class="fw-normal">Please Sign Up</h3>
    <form>
      <div class="mb-3">
        <form-group-input
          class="test-name"
          label="Name"
          type="text"
          v-model="$v.user.name.$model"
          :has-error="$v.user.name.$error"
          :errorMessage="nameErrorMessage"
        />
      </div>
      <div class="mb-3">
        <form-group-input
          class="test-email"
          label="Email"
          type="email"
          v-model="$v.user.email.$model"
          :has-error="$v.user.email.$error"
          :errorMessage="emailErrorMessage"
        />
      </div>
      <div class="mb-3">
        <form-group-input
          class="test-password"
          label="Password"
          type="password"
          v-model="$v.user.password.$model"
          :has-error="$v.user.password.$error"
          :errorMessage="passwordErrorMessage"
        />
      </div>
      <div class="mb-3">
        <form-group-input
          class="test-repeat-password"
          label="Repeat Password"
          type="password"
          v-model="$v.user.repeatPassword.$model"
          :has-error="$v.user.repeatPassword.$error"
          :errorMessage="repeatPasswordErrorMessage"
        />
      </div>
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onSignUpHandler"
        :disabled="isSignUpButtonDisabled"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        <span v-else>Sign Up</span>
      </button>
    </form>
    <div class="mb-3 test-footer">
      <span>Already have an account? </span>
      <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import authService from "../services/auth.service";

import statusCode from "../constants/status-code";

import FormGroupInput from "../components/FormGroupInput.vue";

export default {
  name: "SignUp",
  components: {
    FormGroupInput,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
      serverErrorMessage: "",
      loading: false,
    };
  },
  validations: {
    user: {
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
  },
  computed: {
    nameErrorMessage() {
      if (!this.$v.user.name.$required) {
        return "Name is required";
      }

      return "";
    },
    emailErrorMessage() {
      if (!this.$v.user.email.$required || !this.$v.user.email.$email) {
        return "Invalid email";
      }

      return "";
    },
    passwordErrorMessage() {
      if (!this.$v.user.password.$required) {
        return "Password is required";
      }

      return "";
    },
    repeatPasswordErrorMessage() {
      if (!this.$v.user.repeatPassword.$required) {
        return "Passwords must be identical";
      }

      return "";
    },
    isSignUpButtonDisabled() {
      return (this.$v.$anyDirty && this.$v.$invalid) || this.loading;
    },
  },
  methods: {
    async onSignUpHandler() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          await authService.signUp(this.user);
          this.$router.push({
            name: "sign-in",
            params: { userRegisteredSuccessfully: true },
          });
        } catch (error) {
          this.handleServerError(error);
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
    handleServerError(error) {
      if (error?.response?.status === statusCode.CONFLICT) {
        this.serverErrorMessage = "Email already registered";
      } else {
        this.serverErrorMessage =
          "Something unexpected happened. Please try again later";
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
