<template>
  <div class="sign-up">
    <h1>Feroot</h1>
    <h4>Please Sign Up</h4>
    <form>
      <div class="mb-3">
        <label for="nameInput" class="form-label">Name</label>
        <input
          type="text"
          id="nameInput"
          class="form-control"
          v-model="user.name"
        />
      </div>
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email</label>
        <input
          type="email"
          id="emailInput"
          class="form-control"
          v-model="user.email"
        />
      </div>
      <div class="mb-3">
        <label for="passwordInput" class="form-label">Password</label>
        <input
          type="password"
          id="passwordInput"
          class="form-control"
          v-model="user.password"
        />
      </div>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onSignUpHandler"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import authService from "../services/auth.service";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSignUpHandler() {
      try {
        const response = await authService.signUp(this.user);
        console.log(response);
        this.$router.push({ name: "sign-in" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sign-up {
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
