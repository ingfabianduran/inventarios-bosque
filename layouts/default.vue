<template>
  <v-app>
    <Bar @changeNavigation="changeNavigation" />
    <Navigation :navigation="navigation" />
    <v-main class="color-default">
      <v-container fluid fill-height>
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
  /**
    * @module layout/default
  */
  import Bar from '~/components/Layout/Bar';
  import Navigation from '~/components/Layout/Navigation';
  import Footer from '~/components/Layout/Footer';
  /**
   * @vue-data {Boolean} navigation - Variable que controla la visibilidad de la barra lateral
   * @vue-event {Boolean}  - Setea la variable navigation.
   *
  */
  export default {
    data() {
      return {
        navigation: {
          isView: true
        }
      }
    },
    components: {
      Bar,
      Navigation,
      Footer
    },
    methods: {
      changeNavigation(value) {
        this.navigation.isView = value;
      }
    },
  }
</script>
<style>
  .color-default {
    background-color: #F2F2F2;
  }
</style>
