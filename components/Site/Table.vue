<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    props: {
      headers: Array,
      items: Array
    },
  }
</script>