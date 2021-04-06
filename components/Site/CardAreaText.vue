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
  export default {
    props: {
      texto: {
        type: String,
        required: true
      }
    }
  }
</script>
