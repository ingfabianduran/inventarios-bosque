<template>
  <v-overlay 
    :value="isShow"
    absolute>
    <v-progress-circular
      indeterminate
      color="#7BC142"
      :size="size">
    </v-progress-circular>
  </v-overlay>
</template>
<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        required: true
      },
      size: {
        type: String,
        required: true
      }
    }
  }
</script>