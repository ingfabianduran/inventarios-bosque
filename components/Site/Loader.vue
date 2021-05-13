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
  /**
    * @module components/Site/Loader
  */
  /**
    * @vue-prop {Boolean} isShow - Valida si se muestra o no el componente.
    * @vue-prop {String} color - Color del componente v-overlay.
    * @vue-prop {String} [opacity='0.46'] - Opacidad del componente v-overlay.
    * @vue-prop {String} size - Tamaño del componente v-progress-circular.
    * @vue-prop {String} [with='4'] - Ancho ddel componente v-progress-circular.
  */
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
