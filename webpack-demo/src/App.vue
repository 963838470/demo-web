<template>
  <div id="app">
    <Upload></Upload>
    <viewerjs />
  </div>
</template>

<script>
import viewerjs from './pages/viewerjs'
import Upload from './pages/element/Upload'

export default {
  name: 'App',
  components: {
    viewerjs,
    Upload
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
