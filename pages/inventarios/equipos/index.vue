<template>
  <div>
    <v-row>
      <v-col>
        <Card />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Equipos"
          :headers="headers"
          :items="equipos"
          url="api/inventario/equipos/"
          :search="search" />
      </v-col>
    </v-row>
    <Pagination :page="page" />
  </div>
</template>
<script>
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
          { text: 'Id', value: 'id', aling: ' d-none' },
          { text: 'Serie', value: 'serie', sortable: false },
          { text: 'Tipo de Equipo', value: 'tipo', sortable: false },
          { text: 'Nombre de Red', value: 'nombreRed', sortable: false },
          { text: 'Usuario de Dominio', value: 'usuarioDominio', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        equipos: [

        ],
        page: {
          current: 1,
          last: 0,
          url: 'api/inventario/equipos/i/10?page='
        },
        search: {
          label: 'Inventario, serial o numero interno',
          url: ''
        },
      }
    },
    components: {
      Card,
      Table,
      Pagination
    }
  }
</script>
