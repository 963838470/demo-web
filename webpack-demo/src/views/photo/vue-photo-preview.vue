<template>
  <div>
    <h2>vue-photo-preview</h2>
    <img src="1.png" preview="0" preview-text="描述文字" />
    <img src="2.png" preview="0" preview-text="描述文字" />
  </div>
</template>

<script>
export default {}
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
