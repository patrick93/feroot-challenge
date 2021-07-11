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
          v-model="userCredentials.email"
        />
      </div>
      <div class="mb-3">
        <label for="passwordInput" class="form-label">Password</label>
        <input
          type="password"
          id="passwordInput"
          class="form-control"
          v-model="userCredentials.password"
        />
      </div>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onSignInHandler"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import authService from '../services/auth.service';
import sessionService from "../services/session.service";

export default {
  name: "SignIn",
  data() {
    return {
      userCredentials: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async onSignInHandler() {
      try {
        const { token } = await authService.signIn(this.userCredentials);
        sessionService.save(token);
        console.log(sessionService.getUserInfo());
      } catch (error) {
        console.error(error);
      }
    }
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
}
</style>

