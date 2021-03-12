<template>
  <v-footer
    app
    dark
    :color="color">
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
    props: {
      color: String
    },
    computed: {
      getYear() {
        return moment().format('YYYY');
      }
    }
  }
</script>
