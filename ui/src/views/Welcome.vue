<template>
  <div class="welcome">
    <h4>Welcome {{ user.name }}!</h4>
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
import userService from "../services/user.service";
import authService from "../services/auth.service";

export default {
  name: "Welcome",
  data() {
    return {
      user: null,
    };
  },
  async created() {
    this.user = await userService.getUserInfo();
  },
  methods: {
    onLogoutHandler() {
      authService.logout();
      this.$router.push({ name: "sign-in" });
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome {
}
</style>
