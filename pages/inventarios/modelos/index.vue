<template>
  <div>
    <v-row>
      <v-col>
        <Modelo :titulo="titulo" :url="url" :data="modelo" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Modelos"
          :headers="headers"
          :items="modelos"
          url="api/inventario/modelos/"
          :search="search"
          @getModel="getModelo"
          @searchModel="searchListModelos"
          @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListModelos" />
  </div>
</template>
<script>
  /**
    * @module pages/inventarios/modelos/index
  */
  import Modelo from '~/components/Inventario/Modelos/StepperModelo';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} modelo - Datos para gestionar la api del modelo.
   * @vue-data {Array} headers - Configura lo que va a mostrar la tabla.
   * @vue-data {Array} modelos - Lista de modelos mostrada en la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-data {Object} search - Configura la busqueda sobre el modelo.
   * @vue-data {String} titulo - Titulo del formulario modelo.
   * @vue-data {String} url - Url del formulario que ejecuta una petición.
   * @vue-event {Array} updateListModelos - Actualiza la informacion sobre la tabla.
   * @vue-event {Object} getModelo - Trae el modelo seleccionado desde la tabla.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListModelos - Cambia los valores en la tabla cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Modelos'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Marca', value: 'marca.nombre', sortable: false },
          { text: 'Descripción', value: 'descripcion', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        modelos: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/inventario/modelos/i/10?page='
        },
        search: {
          label: 'Nombre del modelo',
          url: 'api/inventario/modelos/buscar/descripcion/'
        },
        titulo: 'Nuevo Modelo',
        modelo: {},
        url: 'api/inventario/modelos'
      }
    },
    components: {
      Modelo,
      Table,
      Pagination,
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/inventario/modelos/i/10?page=${this.page.current}`);
      this.modelos = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/inventario/modelos/i/10?page=';
    },
    methods: {
      updateListModelos(modelos) {
        this.modelos = modelos.data;
        this.page.current = modelos.current;
      },
      getModelo(modelo) {
        this.modelo = modelo;
        this.titulo = 'Actualizar Modelo';
        this.url = `api/inventario/modelos/${this.modelo.id}`
      },
      searchListModelos(modelos) {
        this.modelos = modelos.data.data;
        this.page.current = 1;
        this.page.last = modelos.data.last_page;
        this.page.url = modelos.url;
      },
      clearForm() {
        this.titulo = 'Nuevo Modelo';
        this.url = 'api/inventario/modelos';
        this.modelo = {};
        this.$fetch();
      }
    }
  }
</script>
