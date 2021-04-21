<template>
  <div>
    <v-row
      align="center"
      justify="center">
      <v-col
        sm="12"
        md="8"
        lg="8"
        xl="8">
        <Form :titulo="edificio.titulo" :edificio="edificio.data" :url="edificio.url" :textBtn="edificio.textBtn" @clearForm="clearForm" />
      </v-col>
      <v-col
        sm="12"
        md="4"
        lg="4"
        xl="4">
        <Busqueda nameBusqueda="Nombre del edificio" url="api/asignacion/edificios/buscar/nombre/" @searchModel="searchListEdificios" @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(edificio, i) in edificios" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Edificio :model="edificio" url="/api/asignacion/edificios/" @getModel="getEdificio" @getModels="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEdificios" />
  </div>
</template>
<script>
  import Form from '~/components/Asignacion/Edificios/FormEdificio';
  import Busqueda from '~/components/Site/CardSearch';
  import Edificio from '~/components/Site/SimpleCard';
  import Pagination from '~/components/Site/Pagination';

  export default {
    middleware: ['auth', 'isCoordinador'],
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
      Busqueda,
      Edificio,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/asignacion/edificios/i/10?page=${this.page.current}`);
      this.edificios = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/asignacion/edificios/i/10?page=';
    },
    methods: {
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
        this.$fetch();
      },
      searchListEdificios(edificios) {
        this.edificios = edificios.data.data;
        this.page.current = 1;
        this.page.last = edificios.data.last_page;
        this.page.url = edificios.url;
      },
    }
  }
</script>
