<template>
  <div>
    <v-row>
      <v-col>
        <Equipo v-show="isViewAddEquipo" :titulo="titulo" :url="url" :data="equipo" @clearForm="clearForm" />
        <Card v-show="!isViewAddEquipo" :equipo="equipo" @addEquipo="isViewAddEquipo = true" @updateEquipo="updateEquipo" />
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
          @updateModels="$fetch"
          @searchModel="searchListEquipos"
          @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEquipos" />
  </div>
</template>
<script>

  import Equipo from '~/components/Inventario/Equipos/StepperEquipo';
  import Card from '~/components/Inventario/Equipos/CardEquipo';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';

  export default {
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
        isViewAddEquipo: true,
        titulo: 'Agregar Equipo',
        url: 'api/inventario/equipos',
        equipo: {},
      }
    },
    components: {
      Equipo,
      Card,
      Table,
      Pagination,
    },
    async fetch () {
      const { data } = await this.$axios.$get(`api/inventario/equipos/i/10?page=${this.page.current}`);
      this.equipos = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/inventario/equipos/i/10?page=';
    },
    methods: {
      updateListEquipos(equipos) {
        this.equipos = equipos.data;
        this.page.current = equipos.current;
      },
      getEquipo(equipo) {
        this.equipo = equipo;
        this.isViewAddEquipo = false;
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
      clearForm() {
        this.titulo = 'Nuevo Equipo';
        this.url = 'api/inventario/equipos';
        this.data = {};
        this.$fetch();
      }
    }
  }
</script>
