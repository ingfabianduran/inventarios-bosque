<template>
  <v-app>
    <v-main class="color-index">
      <v-container fluid fill-height >
        <v-row
          align="center"
          justify="center">
          <v-col sm="12" md="12" lg="8" xl="8">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer color="#F27830" />
  </v-app>
</template>
<script>
  /**
    * @module layout/index
  */
  import Footer from '~/components/Layout/Footer';

  export default {
    components: {
      Footer
    }
  }
</script>
<style>
  .color-index {
    background-color: #7BC142;
  }
</style>
