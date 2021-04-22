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
