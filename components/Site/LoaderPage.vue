<template>
  <v-overlay 
    :value="isShow"
    absolute
    color="F2F2F2"
    opacity="1">
    <v-progress-circular
      indeterminate
      color="#7BC142"
      size="120"
      width="9">
    </v-progress-circular>
  </v-overlay>
</template>
<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      start() {
        this.$store.commit('SET_LOADING', true);
        this.isShow = true;
      },
      finish() {
        this.$store.commit('SET_LOADING', false);
        this.isShow = false
      }
    }
  }
</script>