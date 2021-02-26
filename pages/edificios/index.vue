<template>
  <div>
    <v-row>
      <v-col>
        <Form />
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        v-for="(edificio, i) in edificios" :key="i"
        sm="12"
        md="6"
        lg="4"
        xl="4">
        <Edificio :edificio="edificio" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEdificios" />
  </div>
</template>
<script>
  import Form from '~/components/Edificios/FormEdificio';
  import Edificio from '~/components/Edificios/CardEdificio';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Edificios'
      }
    },
    data() {
      return {
        edificios: [],
        page: {
          last: 0,
          url: 'api/asignacion/edificios/i/10?page='
        }
      }
    },
    components: {
      Form,
      Edificio, 
      Pagination
    },
    async created() {
      await this.getEdificios();
    },
    methods: {
      async getEdificios() {
        const { data, last_page } = await this.$axios.$get('api/asignacion/edificios/i/10');
        this.edificios = data;
        this.page.last = last_page; 
      },
      updateListEdificios(edificios) {
        this.edificios = edificios;
      }
    }
  }
</script>