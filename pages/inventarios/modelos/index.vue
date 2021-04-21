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
  import Modelo from '~/components/Inventario/Modelos/StepperModelo';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';

  export default {
    middleware: ['auth'],
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
