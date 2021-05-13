<template>
  <v-card flat>
    <v-card-text>
      <v-textarea
        filled
        disabled
        auto-grow
        :value="texto">
      </v-textarea>
    </v-card-text>
  </v-card>
</template>
<script>
  /**
    * @module components/Site/CardAreaText
  */
  /**
    * @vue-prop {String} texto - Cadena de texto mostrada en el v-textarea.
  */
  export default {
    props: {
      texto: {
        type: String,
        required: true
      }
    }
  }
</script>
