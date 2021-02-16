<template>
  <div class="text-center mt-3">
    <v-pagination
      v-model="page"
      :length="15"
      color="#F27830"
      total-visible="6">
    </v-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        page: 1
      }
    }
  }
</script>