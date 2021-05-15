<template>
  <v-app-bar
    app
    color="#F27830"
    dark>
    <v-app-bar-nav-icon @click="changeNavigation"></v-app-bar-nav-icon>
    <v-toolbar-title>Inventarios El Bosque</v-toolbar-title>
  </v-app-bar>
</template>
<script>
  /**
    * Site bar component
    * @vuedoc
    * @exports components/Layout/Bar
  */
  export default {
    data() {
      return {
        navigation: true,
      }
    },
    methods: {
      changeNavigation() {
        this.navigation = !this.navigation;
        this.$emit('changeNavigation', this.navigation);
      }
    }
  }
</script>
