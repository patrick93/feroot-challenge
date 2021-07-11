<template>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border spinner"></div>
  </div>
  <div v-else class="welcome">
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
      loading: false
    };
  },
  async created() {
    try {
      this.loading = true;
      this.user = await userService.getUserInfo();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
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
.spinner {
  color: $dark-blue;
}
.welcome {
}
</style>
