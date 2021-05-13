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
  /**
    * @module components/Site/Pagination
  */
  /**
   * @vue-data {Number} current - Pagina actual.
   * @vue-prop {Object} page - Obtiene toda la información referente a la paginacion.
   * @vue-event {} getData - Obtiene la información de la api y la envia al componente padre.
  */
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
