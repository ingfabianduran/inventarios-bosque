<template>
  <v-overlay
    v-if="loading"
    :value="overlay">
    <v-progress-circular
      indeterminate
      size="100"
      width="6"
      color="#F2F2F2">
    </v-progress-circular>
  </v-overlay>
</template>
<script>
  /**
    * @module components/Site/LoaderPage
  */
  /**
   * @vue-data {Boolean} loading - Valida si se muestra o no el componente.
   * @vue-data {Boolean} overlay - Valida si la carga esta activa o no.
   * @vue-event {} start - Pone en true las variables loading y overlay.
   * @vue-event {} finish - Pone el false las variables loading y overlay.
  */
  export default {
    data: () => ({
      loading: false,
      overlay: false,
    }),
    methods: {
      start() {
        this.loading = true
        this.overlay = true
      },
      finish() {
        setTimeout(() => {
          this.loading = false
          this.overlay = false
        }, 2000);
      },
    },
  }
</script>
