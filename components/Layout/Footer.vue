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
  /**
    * Site footer component
    * @vuedoc
    * @exports components/Layout/Footer
  */
  export default {
    props: {
      color: {
        type: String,
        required: true
      }
    },
    computed: {
      getYear() {
        return moment().format('YYYY');
      }
    }
  }
</script>
