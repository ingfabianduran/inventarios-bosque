<template>
  <div>
    <v-row>
      <v-col>
        <ModeloUpdate v-show="isViewModeloUpdate" titulo="Actualizar Modelo" :modelo="modelo" :marca="true" :procesador="true" @clearForm="isViewModeloUpdate = false" />
        <Modelo v-show="!isViewModeloUpdate" @listModelos="$fetch" />
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
  import ModeloUpdate from '~/components/Inventario/Modelos/FormModelo';

  export default {
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
        modelo: null,
        isViewModeloUpdate: false,
        page: {
          current: 1,
          last: 0,
          url: 'api/inventario/modelos/i/10?page='
        },
        search: {
          label: 'Nombre del modelo',
          url: 'api/inventario/modelos/buscar/descripcion/'
        }
      }
    },
    components: {
      Modelo,
      Table,
      Pagination,
      ModeloUpdate
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
        this.isViewModeloUpdate = true;
      },
      searchListModelos(modelos) {
        this.modelos = modelos.data.data;
        this.page.current = 1;
        this.page.last = modelos.data.last_page;
        this.page.url = modelos.url;
      },
    }
  }
</script>
