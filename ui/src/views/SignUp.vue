<template>
  <div class="sign-up">
    <h4>Please Sign Up</h4>
    <form>
      <div class="mb-3">
        <form-group-input
          label="Name"
          type="text"
          v-model="$v.user.name.$model"
          :has-error="$v.user.name.$error"
          :errorMessage="nameErrorMessage"
        />
      </div>
      <div class="mb-3">
        <form-group-input
          label="Email"
          type="email"
          v-model="$v.user.email.$model"
          :has-error="$v.user.email.$error"
          :errorMessage="emailErrorMessage"
        />
      </div>
      <div class="mb-3">
        <form-group-input
          label="Password"
          type="password"
          v-model="$v.user.password.$model"
          :has-error="$v.user.password.$error"
          :errorMessage="passwordErrorMessage"
        />
      </div>
      <div class="mb-3">
        <form-group-input
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
    <div class="mb-3">
      Already have an account?
      <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import authService from "../services/auth.service";

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
        return "Invalid Email";
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
        return "Passwords must be identical.";
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
