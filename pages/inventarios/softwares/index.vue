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
        <Form :titulo="software.titulo" :software="software.data" :url="software.url" :textBtn="software.textBtn" @clearForm="clearForm" />
      </v-col>
      <v-col
        sm="12"
        md="4"
        lg="4"
        xl="4">
        <Busqueda nameBusqueda="Nombre del software" url="api/inventario/softwares/buscar/nombre/" @searchModel="searchListSoftwares" @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(software, i) in softwares" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Software :model="software" url="/api/inventario/softwares/" @getModel="getSoftware" @getModels="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListSoftwares" />
  </div>
</template>
<script>
  /**
    * @module pages/inventarios/softwares/index
  */
  import Form from '~/components/Inventario/Software/FormSoftware';
  import Busqueda from '~/components/Site/CardSearch';
  import Software from '~/components/Site/SimpleCard';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} software - Datos para gestionar la api del modelo.
   * @vue-data {Array} softwares - Lista de softwares mostrada en la vista.
   * @vue-data {Object} page - Configura la paginacion de la vista.
   * @vue-event {Array} updateListSoftwares - Actualiza la informacion sobre la vista.
   * @vue-event {Object} getSoftware - Trae el modelo seleccionado desde la vista.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListSoftwares - Cambia los valores en la vista cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Softwares'
      }
    },
    data() {
      return {
        software: {
          titulo: 'Nuevo Software',
          data: {},
          url: '/api/inventario/softwares',
          textBtn: 'Registrar'
        },
        softwares: [],
        page: {
          current: 1,
          last: 0,
          url: '/api/inventario/softwares/i/10?page='
        }
      }
    },
    components: {
      Form,
      Busqueda,
      Software,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`/api/inventario/softwares/i/10?page=${this.page.current}`);
      this.softwares = data.data;
      this.page.last = data.last_page;
      this.page.url = '/api/inventario/softwares/i/10?page=';
    },
    methods: {
      updateListSoftwares(softwares) {
        this.softwares = softwares.data;
        this.page.current = softwares.current;
      },
      getSoftware(software) {
        this.software.titulo = 'Actualizar Software';
        this.software.data = software;
        this.software.url = `/api/inventario/softwares/${software.id}`;
        this.software.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.software.titulo = 'Nuevo Software';
        this.software.data = {};
        this.software.url = '/api/inventario/softwares';
        this.software.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListSoftwares(softwares) {
        this.softwares = softwares.data.data;
        this.page.current = 1;
        this.page.last = softwares.data.last_page;
        this.page.url = softwares.url;
      },
    }
  }
</script>
