<template>
  <v-app>
    <Bar @changeNavigation="changeNavigation" />
    <Navigation :isView="navigation" />
    <v-main class="color-default">
      <Loader :isShow="this.$store.state.loading" color="#F2F2F2" opacity="1" size="120" width="9" />
      <v-container fluid fill-height>
        <v-row 
          align="center"
          justify="center"
          class="my-1 mx-1">
          <v-col>
            <nuxt v-show="!this.$store.state.loading" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer color="#7BC142" />
  </v-app>
</template>
<script>
  import Loader from '~/components/Site/Loader';
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
      Loader,
      Bar,
      Navigation,
      Footer
    },
    methods: {
      changeNavigation(value) {
        this.navigation = value;
      }
    },
  }
</script>
<style>
  .color-default {
    background-color: #F2F2F2;
  }
</style>