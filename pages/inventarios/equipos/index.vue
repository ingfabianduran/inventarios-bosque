<template>
  <div>
    <v-row>
      <v-col>
        <Equipo v-show="isViewAddEquipo" :titulo="titulo" :url="url" :data="equipo" @showCardEquipo="showCardEquipo" @clearForm="clearForm" />
        <Card v-show="!isViewAddEquipo" :equipo="equipo" @addEquipo="isViewAddEquipo = true" @updateEquipo="updateEquipo" :whenDeleteEquipo="whenDeleteEquipo" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Equipos"
          :headers="headers"
          :items="equipos"
          url="api/inventario/equipos/"
          :search="search"
          @getModel="getEquipo"
          @updateModels="deleteEquipo"
          @searchModel="searchListEquipos"
          @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEquipos" />
  </div>
</template>
<script>
  /**
    * @module pages/inventarios/equipos/index
  */
  import Equipo from '~/components/Inventario/Equipos/StepperEquipo';
  import Card from '~/components/Inventario/Equipos/CardEquipo';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} equipo - Datos para gestionar la api del modelo.
   * @vue-data {Array} headers - Configura lo que va a mostrar la tabla.
   * @vue-data {Array} equipos - Lista de equipos mostrada en la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-data {Object} search - Configura la busqueda sobre el modelo.
   * @vue-data {Boolean} isViewAddEquipo - Valida si se muestra o no el formulario para crear un equipo.
   * @vue-data {String} titulo - Configura el titulo del formulario equipo.
   * @vue-data {String} url - Url que va a ejecutar el formulario equipo para realizar la petición.
   * @vue-data {Boolean} whenDeleteEquipo - Deshabilita en el componente Card las opciones cuando un equipo es eliminado del sistema.
   * @vue-event {Array} updateListEquipos - Actualiza la informacion sobre la tabla.
   * @vue-event {Object} getEquipo - Trae el modelo seleccionado desde la tabla.
   * @vue-event {Object} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListEquipos - Cambia los valores en la tabla cuando se esta realizando una busqueda.
   * @vue-event {} updateEquipo - Hace que el formulario sea visible para actualizar el equipo.
   * @vue-event {} showCardEquipo - Pone visible al componente Card.
   * @vue-event {} deleteEquipo - Setea la variable whenDeleteEquipo cuando se elimina un equipo desde la tabla.
  */
  export default {
    middleware: ['auth'],
    head() {
      return {
        title: 'Equipos'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Tipo de Equipo', value: 'tipo', sortable: false },
          { text: 'Serie', value: 'serie', sortable: false },
          { text: 'Usuario de Dominio', value: 'caracteristica.usuario_dominio', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        equipos: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/inventario/equipos/i/10?page='
        },
        search: {
          label: 'Inventario, serial o numero interno',
          url: 'api/inventario/equipos/buscar/'
        },
        isViewAddEquipo: false,
        titulo: 'Nuevo Equipo',
        url: 'api/inventario/equipos',
        equipo: {},
        whenDeleteEquipo: false
      }
    },
    components: {
      Equipo,
      Card,
      Table,
      Pagination,
    },
    async fetch () {
      await this.listEquipos();
      await this.getConfig();
      if (this.$auth.user.rol === 'SOPORTE' || this.$auth.user.rol === 'MESA') {
        this.isViewAddEquipo = false;
      }
    },
    methods: {
      async listEquipos() {
        const { data } = await this.$axios.$get(`api/inventario/equipos/i/10?page=${this.page.current}`);
        this.equipos = data.data;
        this.page.last = data.last_page;
        this.page.url = 'api/inventario/equipos/i/10?page=';
      },
      async getConfig() {
        const { data } = await this.$axios.$get('api/config');
        this.$store.commit('setConfig', data.migraciones);
      },
      updateListEquipos(equipos) {
        this.equipos = equipos.data;
        this.page.current = equipos.current;
      },
      getEquipo(equipo) {
        this.equipo = equipo;
        this.isViewAddEquipo = false;
        this.whenDeleteEquipo = false;
      },
      searchListEquipos(equipos) {
        this.equipos = equipos.data.data;
        this.page.current = 1;
        this.page.last = equipos.data.last_page;
        this.page.url = equipos.url;
      },
      updateEquipo() {
        this.isViewAddEquipo = true;
        this.titulo = 'Modificar Equipo';
        this.url = `api/inventario/equipos/${this.equipo.id}`;
      },
      async clearForm(equipo) {
        const { data } = await this.$axios.$get(`api/inventario/equipos/${equipo.id}`);
        this.equipo = data;
        this.titulo = 'Nuevo Equipo';
        this.url = 'api/inventario/equipos';
        this.isViewAddEquipo = false;
        this.$fetch();
      },
      showCardEquipo() {
        this.isViewAddEquipo = false;
      },
      deleteEquipo() {
        this.$fetch();
        this.whenDeleteEquipo = true;
      }
    }
  }
</script>
