<template>
  <v-overlay 
    :value="isShow"
    absolute
    :color="color"
    :opacity="opacity">
    <v-progress-circular
      indeterminate
      color="#7BC142"
      :size="size"
      :width="width">
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
      color: {
        type: String,
        required: true
      },
      opacity: {
        type: String,
        default: '0.46'
      },
      size: {
        type: String,
        required: true
      },
      width: {
        type: String,
        default: '4'
      }
    }
  }
</script>