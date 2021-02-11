<template>
  <v-card
    class="border-card">
    <v-row 
      no-gutters 
      align="center">
      <v-col sm="12" md="5" lg="5" xl="5">
        <Carusel />
      </v-col>
      <v-col sm="12" md="7" lg="7" xl="7" class="pa-10">
        <FormLogin />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  import Carusel from '~/components/Index/Carusel';
  import FormLogin from '~/components/Index/FormLogin';

  export default {
    layout: 'index',
    head() {
      return {
        title: 'Inventarios Tecnologia'
      }
    },
    components: {
      Carusel,
      FormLogin,
    }
  }
</script>
<style>
  .border-card {
    border-radius: 25px !important;
    overflow: hidden;
  }
</style>