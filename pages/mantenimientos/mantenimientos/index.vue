<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="mantenimiento.titulo" :mantenimiento="mantenimiento.data" :url="mantenimiento.url" :textBtn="mantenimiento.textBtn" @clearForm="clearForm" />
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
  import Form from '~/components/Mantenimiento/Mantenimientos/FormMantenimiento';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';

  export default {
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
          textBtn: 'Registrar'
        },
        mantenimientos: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/mantenimiento/mantenimientos/i/10?page='
        },
        search: {
          label: 'Inventario, serial o numero interno',
          url: ''
        }
      }
    },
    components: {
      Form,
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
      },
      async clearForm() {
        this.mantenimiento.titulo = 'Nuevo Mantenimiento';
        this.mantenimiento.data = {};
        this.mantenimiento.url = 'api/mantenimiento/mantenimientos';
        this.mantenimiento.textBtn = 'Registrar';
      },
      searchListMantenimientos(mantenimientos) {
        this.mantenimientos = mantenimientos.data.data;
        this.page.current = 1;
        this.page.last = mantenimientos.data.last_page;
        this.page.url = mantenimientos.url;
      },
    }
  }
</script>
