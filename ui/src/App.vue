<template>
  <div class="app">
    <img class="logo" src="./assets/images/logo.svg" alt="" srcset="" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: $dark-blue;

  .container {
    width: 100%;
    max-width: 400px;
    padding: 15px 30px;
    margin: 0 auto;
    text-align: center;
    background-color: $white;
    border-radius: 10px;
  }

  .logo {
    margin-bottom: 60px;
    height: 45px;
  }
}
</style>
