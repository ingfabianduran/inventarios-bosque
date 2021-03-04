<template>
  <div class="text-center mt-3">
    <v-pagination
      v-model="current"
      :length="page.last"
      color="#F27830"
      total-visible="10"
      @input="getData()">
    </v-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        current: 1
      }
    },
    props: {
      page: Object,
      required: true
    },
    methods: {
      async getData() {
        const { data } = await this.$axios.$get(`${this.page.url}${this.current}`);
        const pagination = {
          data: data.data,
          current: this.current
        };
        this.$emit('getData', pagination);
      }
    }
  }
</script>