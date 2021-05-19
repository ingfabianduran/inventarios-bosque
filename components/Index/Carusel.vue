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
  /**
    * @module components/Index/Carusel
  */
  /**
    * @vue-data {Array} images - Lista la cual almacena la ruta de acceso a la fotos del login.
  */
  export default {
    data() {
      return {
        images: []
      }
    },
    created() {
      for (let index = 1; index < 9; index ++) {
        this.images.push({ src: `/images/foto_${index}.jpg` });
      }
    }
  }
</script>
<style>
  .border-item {
    border-radius: 25px 0px 0px 25px;
    overflow: hidden;
  }
</style>
