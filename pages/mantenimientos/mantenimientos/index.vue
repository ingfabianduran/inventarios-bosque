<template>
  <div>
    <v-row
      align="center"
      justify="center">
      <v-col
        cols="12"
        :md="(aranda.mantenimiento === 0 ? 12 : 8)">
        <Mantenimiento
          :titulo="mantenimiento.titulo"
          :mantenimiento="mantenimiento.data"
          :url="mantenimiento.url"
          :textBtn="mantenimiento.textBtn"
          :stateBtn="mantenimiento.stateBtn"
          @clearForm="clearFormMantenimiento" />
      </v-col>
      <v-col
        cols="12"
        md="4"
        v-show="aranda.mantenimiento !== 0">
        <Aranda
          :titulo="aranda.titulo"
          :aranda="aranda.data"
          :url="aranda.url"
          :textBtn="aranda.textBtn"
          :stateBtn="aranda.stateBtn"
          :mantenimiento="aranda.mantenimiento"
          @clearForm="clearFormAranda" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Mantenimientos"
          :headers="headers"
          :items="mantenimientos"
          url="api/mantenimiento/mantenimientos/"
          :search="search"
          @getModel="getMantenimiento"
          @updateModels="$fetch"
          @searchModel="searchListMantenimientos"
          @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListMantenimientos" />
  </div>
</template>
<script>
  /**
    * @module pages/mantenimientos/mantenimientos/index
  */
  import Mantenimiento from '~/components/Mantenimiento/Mantenimientos/FormMantenimiento';
  import Aranda from '~/components/Mantenimiento/Aranda/FormAranda';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} mantenimiento - Datos para gestionar la api del modelo.
   * @vue-data {Array} headers - Configura lo que va a mostrar la tabla.
   * @vue-data {Array} mantenimientos - Lista de mantenimientos mostrada en la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-data {Object} search - Configura la busqueda sobre el modelo.
   * @vue-event {Array} updateListMantenimientos - Actualiza la informacion sobre la tabla.
   * @vue-event {Object} getMantenimiento - Trae el modelo seleccionado desde la tabla.
   * @vue-event {} clearFormMantenimiento - Reinicia los valores sobre el modelo mantenimiento.
   * @vue-event {} clearFormAranda - Reinicia los valores sobre el modelo aranda.
   * @vue-event {Array} searchListMantenimientos - Cambia los valores en la tabla cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth'],
    head() {
      return {
        title: 'Mantenimientos'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Fecha', value: 'created_at', sortable: false },
          { text: 'Categoria', value: 'categoria.nombre', sortable: false },
          { text: 'Especialista', value: 'user.nombre', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        mantenimiento: {
          titulo: 'Nuevo Mantenimiento',
          data: {},
          url: 'api/mantenimiento/mantenimientos',
          textBtn: 'Registrar',
          stateBtn: false
        },
        mantenimientos: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/mantenimiento/mantenimientos/i/10?page='
        },
        search: {
          label: 'Inventario, serial, numero interno o tecnico',
          url: 'api/mantenimiento/mantenimientos/buscar/'
        },
        aranda: {
          titulo: 'Registrar Caso Aranda',
          data: {},
          url: '',
          textBtn: 'Registrar',
          stateBtn: false,
          mantenimiento: 0
        },
        showAranda: false
      }
    },
    components: {
      Mantenimiento,
      Aranda,
      Table,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/mantenimiento/mantenimientos/i/10?page=${this.page.current}`);
      this.mantenimientos = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/mantenimiento/mantenimientos/i/10?page=';
    },
    methods: {
      updateListMantenimientos(mantenimientos) {
        this.mantenimientos = mantenimientos.data;
        this.page.current = mantenimientos.current;
      },
      getMantenimiento(mantenimiento) {
        this.mantenimiento.titulo = 'Actualizar Mantenimiento';
        this.mantenimiento.data = mantenimiento;
        this.mantenimiento.url = `api/mantenimiento/mantenimientos/${mantenimiento.id}`;
        this.mantenimiento.textBtn = 'Actualizar';
        this.mantenimiento.stateBtn = (this.$auth.user.rol !== 'COORDINADOR' ? true : false);

        if (mantenimiento.aranda !== null) {
          this.aranda.titulo = 'Actualizar Caso Aranda';
          this.aranda.data = mantenimiento.aranda;
          this.aranda.url = `api/mantenimiento/arandas/${mantenimiento.aranda.id}`;
          this.aranda.textBtn = 'Actualizar';
          this.aranda.stateBtn = (this.$auth.user.rol !== 'COORDINADOR' ? true : false);
          this.aranda.mantenimiento = mantenimiento.id;
        } else {
          this.aranda.titulo = 'Registrar Caso Aranda';
          this.aranda.data = {};
          this.aranda.url = `api/mantenimiento/arandas`;
          this.aranda.textBtn = 'Registrar';
          this.aranda.mantenimiento = mantenimiento.id;
        }
      },
      async clearFormMantenimiento() {
        this.mantenimiento.titulo = 'Nuevo Mantenimiento';
        this.mantenimiento.data = {};
        this.mantenimiento.url = 'api/mantenimiento/mantenimientos';
        this.mantenimiento.textBtn = 'Registrar';
        this.mantenimiento.stateBtn = false;
        this.aranda.mantenimiento = 0;
        this.$fetch();
      },
      clearFormAranda() {
        this.aranda.titulo = 'Registrar Caso Aranda';
        this.aranda.data = {};
        this.aranda.url = `api/mantenimiento/arandas`;
        this.aranda.textBtn = 'Registrar';
        this.aranda.mantenimiento = 0;
        this.aranda.stateBtn = false;
      },
      searchListMantenimientos(mantenimientos) {
        this.mantenimientos = mantenimientos.data.data;
        this.page.current = 1;
        this.page.last = mantenimientos.data.last_page;
        this.page.url = mantenimientos.url;
      }
    }
  }
</script>
