<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="especialista.titulo" :especialista="especialista.data" :url="especialista.url" :textBtn="especialista.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Especialistas"
          :headers="headers"
          :items="especialistas"
          url="api/mantenimiento/users/"
          :search="search"
          @getModel="getEspecialista"
          @updateModels="$fetch"
          @searchModel="searchListEspecialistas"
          @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEspecialistas" />
  </div>
</template>
<script>
  /**
    * @module pages/mantenimientos/especialistas/index
  */
  import Form from '~/components/Mantenimiento/Especialistas/FormEspecialista';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} especialista - Datos para gestionar la api del modelo.
   * @vue-data {Array} headers - Configura lo que va a mostrar la tabla.
   * @vue-data {Array} especialistas - Lista de especialistas mostrada en la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-data {Object} search - Configura la busqueda sobre el modelo.
   * @vue-event {Array} updateListEspecialistas - Actualiza la informacion sobre la tabla.
   * @vue-event {Object} getEspecialista - Trae el modelo seleccionado desde la tabla.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListEspecialistas - Cambia los valores en la tabla cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Especialistas'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Nombres', value: 'nombre', sortable: false },
          { text: 'Apellidos', value: 'apellido', sortable: false },
          { text: 'Rol', value: 'rol', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        especialista: {
          titulo: 'Nuevo Especialista',
          data: {},
          url: 'api/mantenimiento/users',
          textBtn: 'Registrar'
        },
        especialistas: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/mantenimiento/users/i/10?page='
        },
        search: {
          label: 'Nombre, apellido, cedula o correo',
          url: 'api/mantenimiento/users/buscar/'
        }
      }
    },
    components: {
      Form,
      Table,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/mantenimiento/users/i/10?page=${this.page.current}`);
        this.especialistas = data.data;
        this.page.last = data.last_page;
        this.page.url = 'api/mantenimiento/users/i/10?page=';
    },
    methods: {
      updateListEspecialistas(especialistas) {
        this.especialistas = especialistas.data;
        this.page.current = especialistas.current;
      },
      getEspecialista(especialista) {
        this.especialista.titulo = 'Actualizar Especialista';
        this.especialista.data = especialista;
        this.especialista.url = `api/mantenimiento/users/${especialista.id}`;
        this.especialista.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.especialista.titulo = 'Nuevo Especialista';
        this.especialista.data = {};
        this.especialista.url = 'api/matenimientos/usuarios';
        this.especialista.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListEspecialistas(especialistas) {
        this.especialistas = especialistas.data.data;
        this.page.current = 1;
        this.page.last = especialistas.data.last_page;
        this.page.url = especialistas.url;
      },
    }
  }
</script>
