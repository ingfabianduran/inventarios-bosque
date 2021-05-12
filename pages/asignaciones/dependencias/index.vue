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
        <Form :titulo="dependencia.titulo" :dependencia="dependencia.data" :url="dependencia.url" :textBtn="dependencia.textBtn" @clearForm="clearForm" />
      </v-col>
      <v-col
        sm="12"
        md="4"
        lg="4"
        xl="4">
        <Busqueda nameBusqueda="Nombre de la dependencia" url="api/asignacion/dependencias/buscar/nombre/" @searchModel="searchListDependencias" @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(dependencia, i) in dependencias" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Dependencia :model="dependencia" url="/api/asignacion/dependencias/" @getModel="getDependencia" @getModels="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListDependencias" />
  </div>
</template>
<script>
  /**
    * @module pages/asignaciones/dependencias/index
  */
  import Form from '~/components/Asignacion/Dependencias/FormDependencia';
  import Busqueda from '~/components/Site/CardSearch';
  import Dependencia from '~/components/Site/SimpleCard'
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} dependencia - Datos para gestionar la api del modelo.
   * @vue-data {Array} dependencias - Lista de dependencias mostrada en la vista.
   * @vue-data {Object} page - Configura la paginacion de la vista.
   * @vue-event {Array} updateListDependencias - Actualiza la informacion sobre la vista.
   * @vue-event {Object} getDependencia - Trae el modelo seleccionado desde la vista.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListDependencias - Cambia los valores en la vista cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Dependencias',
      }
    },
    data() {
      return {
        dependencia: {
          titulo: 'Nueva Dependencia',
          data: {},
          url: 'api/asignacion/dependencias',
          textBtn: 'Registrar'
        },
        dependencias: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/asignacion/dependencias/i/10?page='
        }
      }
    },
    components: {
      Form,
      Busqueda,
      Dependencia,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/asignacion/dependencias/i/10?page=${this.page.current}`);
      this.dependencias = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/asignacion/dependencias/i/10?page=';
    },
    methods: {
      updateListDependencias(dependencias) {
        this.dependencias = dependencias.data;
        this.page.current = dependencias.current;
      },
      getDependencia(dependencia) {
        this.dependencia.titulo = 'Actualizar Dependencia';
        this.dependencia.data = dependencia;
        this.dependencia.url = `api/asignacion/dependencias/${dependencia.id}`;
        this.dependencia.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.dependencia.titulo = 'Nueva Dependencia';
        this.dependencia.data = {};
        this.dependencia.url = 'api/asignacion/dependencias';
        this.dependencia.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListDependencias(dependencias) {
        this.dependencias = dependencias.data.data;
        this.page.current = 1;
        this.page.last = dependencias.data.last_page;
        this.page.url = dependencias.url;
      },
    }
  }
</script>
