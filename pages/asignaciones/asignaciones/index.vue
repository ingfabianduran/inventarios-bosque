<template>
  <div>
    <v-row
      align="center"
      justify="center">
      <v-col>
        <Form :titulo="asignacion.titulo" :asignacion="asignacion.data" :url="asignacion.url" :textBtn="asignacion.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Asignaciones"
          :headers="headers"
          :items="asignaciones"
          url="api/asignacion/asignaciones/"
          :search="search"
          @getModel="getAsignacion"
          @updateModels="$fetch"
          @searchModel="searchListAsignaciones"
          @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListAsignaciones" />
  </div>
</template>
<script>
  /**
    * @module pages/asignaciones/asignaciones/index
  */
  import Form from '~/components/Asignacion/Asignaciones/FormAsignacion';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} asignacion - Datos para gestionar la api del modelo.
   * @vue-data {Array} headers - Configura lo que va a mostrar la tabla.
   * @vue-data {Array} asignaciones - Lista de asignaciones mostrada en la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-data {Object} search - Configura la busqueda sobre el modelo.
   * @vue-event {Array} updateListAsignaciones - Actualiza la informacion sobre la tabla.
   * @vue-event {Object} getAsignacion - Trae el modelo seleccionado desde la tabla.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListAsignaciones - Cambia los valores en la tabla cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Asignaciones'
      }
    },
    data() {
      return {
        asignacion: {
          titulo: 'Nueva Asignación',
          data: {},
          url: 'api/asignacion/asignaciones',
          textBtn: 'Registrar'
        },
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Fecha', value: 'created_at', sortable: false },
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Responsable', value: 'responsable.nombre', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        asignaciones: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/asignacion/asignaciones/i/10?page='
        },
        search: {
          label: 'Inventario, serial o numero interno',
          url: 'api/asignacion/asignaciones/buscar/'
        }
      }
    },
    components: {
      Form,
      Table,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/asignacion/asignaciones/i/10?page=${this.page.current}`);
      this.asignaciones = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/asignacion/asignaciones/i/10?page=';
    },
    methods: {
      updateListAsignaciones(asignaciones) {
        this.asignaciones = asignaciones.data;
        this.page.current = asignaciones.current;
      },
      getAsignacion(asignacion) {
        this.asignacion.titulo = 'Actualizar Asignación';
        this.asignacion.data = asignacion;
        this.asignacion.url = `api/asignacion/asignaciones/${asignacion.id}`;
        this.asignacion.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.asignacion.titulo = 'Nueva Asignación';
        this.asignacion.data = {};
        this.asignacion.url = 'api/asignacion/asignaciones';
        this.asignacion.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListAsignaciones(asignaciones) {
        this.asignaciones = asignaciones.data.data;
        this.page.current = 1;
        this.page.last = asignaciones.data.last_page;
        this.page.url = asignaciones.url;
      },
    }
  }
</script>
