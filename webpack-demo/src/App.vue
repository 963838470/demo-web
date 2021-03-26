<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <VuePhotoPreview />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import VuePhotoPreview from './pages/vue-photo-preview'

export default {
  name: 'App',
  components: {
    HelloWorld,
    VuePhotoPreview
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
</style>
