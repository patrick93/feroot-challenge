<template>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border spinner"></div>
  </div>
  <div v-else class="welcome">
    <h3 v-if="serverErrorMessage" class="fw-normal test-error-message">
      {{ serverErrorMessage }}
    </h3>
    <template v-else>
      <h3 class="fw-normal">
        Welcome {{ user.name }}!
        <br />
        You're logged in
      </h3>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="onLogoutHandler"
      >
        Logout
      </button>
    </template>
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
      loading: false,
      serverErrorMessage: "",
    };
  },
  async created() {
    try {
      this.loading = true;
      this.user = await userService.getUserInfo();
    } catch (error) {
      this.serverErrorMessage =
        "Something unexpected happened. Try refresh the page";
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
  h3 {
    margin-bottom: 2rem;
  }
}
</style>
