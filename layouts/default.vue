<template>
  <v-app>
    <Bar @changeNavigation="changeNavigation" />
    <Navigation :isView="navigation" />
    <v-main class="color-main">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
  import Bar from '~/components/Layout/Bar';
  import Navigation from '~/components/Layout/Navigation';
  import Footer from '~/components/Layout/Footer';

  export default {
    data() {
      return {
        navigation: true
      }
    },
    components: {
      Bar,
      Navigation,
      Footer
    }, 
    methods: {
      changeNavigation(value) {
        this.navigation = value;
      }
    }
  }
</script>
<style>
  .color-main {
    background-color: #F2F2F2;
  }
</style>