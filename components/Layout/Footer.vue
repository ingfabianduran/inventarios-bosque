<template>
  <v-footer 
    app
    dark
    color="#7BC142">
    <v-col
      class="text-center"
      cols="12">
      {{ getYear }} — <strong>Universidad El Bosque</strong>
    </v-col>
  </v-footer>
</template>
<script>
  import moment from 'moment';

  export default {
    computed: {
      getYear() {
        return moment().format('YYYY');
      }
    }
  }
</script>