<template>
  <div id="app">
    <div class="menu">
      <router-link v-for="r in $router.options.routes" :key="r.path" :to="r.path">{{ r.name }}</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.menu {
  position: fixed;
  height: 40px;
  line-height: 40px;
}

.menu a {
  margin: 20px;
}

.container {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
}
</style>
