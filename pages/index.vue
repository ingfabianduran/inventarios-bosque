<template>
  <v-card
    class="border-card"
    elevation="4">
    <v-row
      no-gutters
      align="center">
      <v-col sm="12" md="7" lg="6" xl="7">
        <Carusel />
      </v-col>
      <v-col sm="12" md="5" lg="6" xl="5" class="pa-10">
        <Form />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  import Carusel from '~/components/Index/Carusel';
  import Form from '~/components/Index/Form';

  export default {
    layout: 'index',
    head() {
      return {
        title: 'Inventarios Tecnologia'
      }
    },
    components: {
      Carusel,
      Form,
    }
  }
</script>
<style>
  .border-card {
    border-radius: 25px !important;
    overflow: hidden;
  }
</style>
