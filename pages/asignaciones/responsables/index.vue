<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="responsable.titulo" :responsable="responsable.data" :url="responsable.url" :textBtn="responsable.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Responsables"
          :headers="headers"
          :items="responsables"
          url="api/asignacion/responsables/"
          :search="search"
          @getModel="getResponsable"
          @updateModels="$fetch"
          @searchModel="searchListResponsables"
          @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListResponsables" />
  </div>
</template>
<script>
  /**
    * @module pages/asignaciones/responsables/index
  */
  import Form from '~/components/Asignacion/Responsables/FormResponsable';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} responsable - Datos para gestionar la api del modelo.
   * @vue-data {Array} headers - Configura lo que va a mostrar la tabla.
   * @vue-data {Array} responsables - Lista de responsables mostrada en la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-data {Object} search - Configura la busqueda sobre el modelo.
   * @vue-event {Array} updateListResponsables - Actualiza la informacion sobre la tabla.
   * @vue-event {Object} getResponsable - Trae el modelo seleccionado desde la tabla.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListResponsables - Cambia los valores en la tabla cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Responsables'
      }
    },
    data() {
      return {
        responsable: {
          titulo: 'Nuevo Responsable',
          data: {},
          url: 'api/asignacion/responsables',
          textBtn: 'Registrar'
        },
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Nombre', value: 'nombre', sortable: false },
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Extension', value: 'extension', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        responsables: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/asignacion/responsables/i/10?page='
        },
        search: {
          label: 'Nombre del responsable',
          url: 'api/asignacion/responsables/buscar/nombre/'
        }
      }
    },
    components: {
      Form,
      Table,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/asignacion/responsables/i/10?page=${this.page.current}`);
      this.responsables = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/asignacion/responsables/i/10?page=';
    },
    methods: {
      updateListResponsables(responsables) {
        this.responsables = responsables.data;
        this.page.current = responsables.current;
      },
      getResponsable(responsable) {
        this.responsable.titulo = 'Actualizar Responsable';
        this.responsable.data = responsable;
        this.responsable.url = `api/asignacion/responsables/${responsable.id}`;
        this.responsable.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.responsable.titulo = 'Nuevo Responsable';
        this.responsable.data = {};
        this.responsable.url = 'api/asignacion/responsables';
        this.responsable.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListResponsables(responsables) {
        this.responsables = responsables.data.data;
        this.page.current = 1;
        this.page.last = responsables.data.last_page;
        this.page.url = responsables.url;
      },
    }
  }
</script>
