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
        <Form :titulo="espacio.titulo" :espacio="espacio.data" :url="espacio.url" :textBtn="espacio.textBtn" @clearForm="clearForm" />
      </v-col>
      <v-col
        sm="12"
        md="4"
        lg="4"
        xl="4">
        <Busqueda nameBusqueda="Nombre del espacio" url="api/asignacion/espacios/buscar/nombre/" @searchModel="searchListEspacios" @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(espacio, i) in espacios"
        :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Espacio :model="espacio" url="/api/asignacion/espacios/" @getModel="getEspacio" @getModels="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEspacios" />
  </div>
</template>
<script>
  /**
    * @module pages/asignaciones/espacios/index
  */
  import Form from '~/components/Asignacion/Espacios/FormEspacio';
  import Busqueda from '~/components/Site/CardSearch';
  import Espacio from '~/components/Site/SimpleCard';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} espacio - Datos para gestionar la api del modelo.
   * @vue-data {Array} espacios - Lista de espacios mostrada en la vista.
   * @vue-data {Object} page - Configura la paginacion de la vista.
   * @vue-event {Array} updateListEspacios - Actualiza la informacion sobre la vista.
   * @vue-event {Object} getEspacio - Trae el modelo seleccionado desde la vista.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListEspacios - Cambia los valores en la vista cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Espacios'
      }
    },
    data() {
      return {
        espacio: {
          titulo: 'Nuevo Espacio',
          data: {},
          url: 'api/asignacion/espacios',
          textBtn: 'Registrar'
        },
        espacios: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/asignacion/espacios/i/10?page='
        }
      }
    },
    components: {
      Form,
      Busqueda,
      Espacio,
      Pagination
    },
    async fetch() {
      const { data }  = await this.$axios.$get(`api/asignacion/espacios/i/10?page=${this.page.current}`);
      this.espacios = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/asignacion/espacios/i/10?page=';
    },
    methods: {
      updateListEspacios(espacios) {
        this.espacios = espacios.data;
        this.page.current = espacios.current;
      },
      getEspacio(espacio) {
        this.espacio.titulo = 'Actualizar Espacio';
        this.espacio.data = espacio;
        this.espacio.url = `api/asignacion/espacios/${espacio.id}`
        this.espacio.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.espacio.titulo = 'Nuevo Espacio';
        this.espacio.data = {};
        this.espacio.url = 'api/asignacion/espacios';
        this.espacio.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListEspacios(espacios) {
        this.espacios = espacios.data.data;
        this.page.current = 1;
        this.page.last = espacios.data.last_page;
        this.page.url = espacios.url;
      },
    }
  }
</script>
