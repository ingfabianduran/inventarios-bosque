<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="edificio.titulo" :edificio="edificio.data" :url="edificio.url" :textBtn="edificio.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        v-for="(edificio, i) in edificios" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Edificio :edificio="edificio" @getEdificio="getEdificio" @getEdificios="getEdificios" />
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
        edificio: {
          titulo: 'Nuevo Edificio',
          data: {},
          url: 'api/asignacion/edificios',
          textBtn: 'Registrar'
        },
        edificios: [],
        page: {
          current: 1,
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
        const { data, last_page } = await this.$axios.$get(`api/asignacion/edificios/i/10?page=${this.page.current}`);
        this.edificios = data;
        this.page.last = last_page; 
      },
      updateListEdificios(edificios) {
        this.edificios = edificios.data;
        this.page.current = edificios.current;
      },
      getEdificio(edificio) {
        this.edificio.titulo = 'Actualizar Edificio';
        this.edificio.data = edificio;
        this.edificio.url = `api/asignacion/edificios/${edificio.id}`;
        this.edificio.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.edificio.titulo = 'Nuevo Edificio';
        this.edificio.data = {};
        this.edificio.url = 'api/asignacion/edificios';
        this.edificio.textBtn = 'Registrar';
        await this.getEdificios();
      }
    }
  }
</script>