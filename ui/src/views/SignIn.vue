<template>
  <div class="sign-in">
    <h1>Feroot</h1>
    <h4>Please Sign In</h4>
    <form>
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email</label>
        <input
          type="email"
          id="emailInput"
          class="form-control"
          v-model.trim="$v.userCredentials.email.$model"
          :class="{ 'is-invalid': $v.userCredentials.email.$error }"
        />
        <div
          v-if="
            !$v.userCredentials.email.$required ||
            !$v.userCredentials.email.$email
          "
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
          v-model.trim="$v.userCredentials.password.$model"
          :class="{ 'is-invalid': $v.userCredentials.password.$error }"
        />
        <div
          v-if="!$v.userCredentials.password.$required"
          class="invalid-feedback"
        >
          Password is required
        </div>
      </div>
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onSignInHandler"
        :disabled="$v.$anyDirty && $v.$invalid"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import authService from "../services/auth.service";
import sessionService from "../services/session.service";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "SignIn",
  data() {
    return {
      userCredentials: {
        email: "",
        password: "",
      },
      serverErrorMessage: "",
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
  methods: {
    async onSignInHandler() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          const { token } = await authService.signIn(this.userCredentials);
          sessionService.save(token);
          this.$router.push({ name: "welcome" });
        } catch (error) {
          if (error.response.status === 400) {
            this.serverErrorMessage = "Invalid email or password";
          } else {
            this.serverErrorMessage =
              "Something unexpected happened. Please try again";
          }
          console.error(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in {
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin: auto;
  text-align: center;
  background-color: #fff;
  border-radius: 15px;

  form {
    text-align: left;
  }

  .server-error-message {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
    margin-bottom: 1rem;
  }
}
</style>
