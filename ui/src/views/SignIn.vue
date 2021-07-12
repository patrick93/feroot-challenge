<template>
  <div class="sign-in">
    <h3 class="fw-normal">Please Sign In</h3>
    <div
      v-if="userRegisteredSuccessfully"
      class="alert alert-success test-user-registered-message"
    >
      User successfully registered. Just sign in.
    </div>
    <form>
      <div class="mb-3">
        <form-group-input
          class="test-email"
          label="Email"
          type="email"
          v-model="$v.userCredentials.email.$model"
          :has-error="$v.userCredentials.email.$error"
          :errorMessage="emailErrorMessage"
        />
      </div>
      <div class="mb-3">
        <form-group-input
          class="test-password"
          label="Password"
          type="password"
          v-model="$v.userCredentials.password.$model"
          :has-error="$v.userCredentials.password.$error"
          :errorMessage="passwordErrorMessage"
        />
      </div>
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onSignInHandler"
        :disabled="($v.$anyDirty && $v.$invalid) || loading"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        <span v-else>Sign In</span>
      </button>
    </form>
    <div class="mb-3 test-footer">
      <span>Does not have an account? </span>
      <router-link :to="{ name: 'sign-up' }">Create new one</router-link>
    </div>
  </div>
</template>

<script>
import authService from "../services/auth.service";
import { required, email } from "vuelidate/lib/validators";

import statusCode from "../constants/status-code";

import FormGroupInput from "../components/FormGroupInput.vue";

export default {
  name: "SignIn",
  components: {
    FormGroupInput,
  },
  data() {
    return {
      userCredentials: {
        email: "",
        password: "",
      },
      serverErrorMessage: "",
      loading: false,
    };
  },
  validations: {
    userCredentials: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    userRegisteredSuccessfully() {
      return this.$route.params.userRegisteredSuccessfully;
    },
    emailErrorMessage() {
      if (
        !this.$v.userCredentials.email.$required ||
        !this.$v.userCredentials.email.$email
      ) {
        return "Invalid email";
      }

      return "";
    },
    passwordErrorMessage() {
      if (!this.$v.userCredentials.password.$required) {
        return "Password is required";
      }

      return "";
    },
    isSignInButtonDisabled() {
      return (this.$v.$anyDirty && this.$v.$invalid) || this.loading;
    },
  },
  methods: {
    async onSignInHandler() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;

        try {
          await authService.signIn(this.userCredentials);
          this.$router.push({ name: "welcome" });
        } catch (error) {
          this.handleServerError(error);
        } finally {
          this.loading = false;
        }
      }
    },
    handleServerError(error) {
      if (error.response.status === statusCode.BAD_REQUEST) {
        this.serverErrorMessage = "Invalid email or password";
      } else {
        this.serverErrorMessage =
          "Something unexpected happened. Please try again later";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in {
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
