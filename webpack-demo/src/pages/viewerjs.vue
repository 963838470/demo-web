<template>
  <div>
    <h2>vue-photo-preview</h2>
    <viewer :images="descImgs" class="descimgBox">
      <img v-for="(decImg, index) in descImgs" :key="index" :src="decImg" />
    </viewer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      descImgs: ['1.png', '2.png', '3.png']
    }
  }
}
</script>

<style scoped>
div {
  border: 1px solid lightgray;
}

img {
  width: 80px;
  height: 80px;
  margin: 10px;
}
</style>
