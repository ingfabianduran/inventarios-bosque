<template>
  <v-carousel
    cycle
    hide-delimiters>
    <v-carousel-item
      v-for="(image, i) in images"
      :key="i"
      :src="image.src"
      reverse-transition="fade-transition"
      transition="fade-transition">
    </v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data() {
      return {
        images: [
          { src: '/images/foto_1.jpg' },
          { src: '/images/foto_2.jpg' },
        ]
      }
    },
  }
</script>
<style>
  .border-item {
    border-radius: 25px 0px 0px 25px;
    overflow: hidden;
  }
</style>
