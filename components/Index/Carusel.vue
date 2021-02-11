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
          { src: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ' },
          { src: 'https://i.picsum.photos/id/180/2400/1600.jpg?hmac=Ig-CXcpNdmh51k3kXpNqNqcDYTwXCIaonYiBOnLXBb8' },
          { src: 'https://i.picsum.photos/id/201/5184/3456.jpg?hmac=3SX-1t9hHlAmc653Ox-EmJonZBCaCSK5b9FayvY4sbI' },
          { src: 'https://i.picsum.photos/id/3/5616/3744.jpg?hmac=QSuBxtSpEv3Qm3iStn2b_Ikzj2EVD0jzn99m1n6JD9I' },
          { src: 'https://i.picsum.photos/id/370/4928/3264.jpg?hmac=UGe0txSnG4hhV-fAoi7e3mTnvQFhYYNcPJJbYFePh5Q' }
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