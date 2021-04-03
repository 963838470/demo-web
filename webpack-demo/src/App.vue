<template>
  <div id="app">
    <div class="menu">
      <router-link v-for="r in $router.options.routes" :key="r.path" :to="r.path">{{ r.name }}</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$router)
    console.log(this.$route)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.menu {
  display: flex;
  justify-content: space-around;
}
</style>
