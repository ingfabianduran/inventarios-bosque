<template>
  <v-app>
    <Bar @changeNavigation="changeNavigation" />
    <Navigation :isView="navigation" />
    <v-main class="color-default">
      <v-container fluid fill-height >
        <v-row 
          align="center"
          justify="center"
          class="my-1 mx-1">
          <v-col>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer color="#7BC142" />
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
  .color-default {
    background-color: #F2F2F2;
  }
</style>