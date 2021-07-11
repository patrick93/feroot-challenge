<template>
  <div class="welcome">
    <h1>Feroot</h1>
    <h4>Welcome {{ user.email }}!</h4>
    <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onLogoutHandler"
      >
        Logout
      </button>
  </div>
</template>

<script>
import sessionService from "../services/session.service";

export default {
  name: "Welcome",
  data() {
    return {
      user: null
    }
  },
  created() {
    this.user = sessionService.getUserInfo();
  },
  methods: {
    onLogoutHandler() {
      sessionService.logout();
      this.$router.push({ name: "sign-in" });
    }
  },
};
</script>

<style lang="scss" scoped>
.welcome {
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

