<template>
  <div>
    <v-row>
      <v-col>
        <Form />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table :headers="headers" :items="items" />
      </v-col>
    </v-row>
    <Pagination />
  </div>
</template>
<script>
  import Form from '~/components/Dependencias/FormDependencia';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Listado de Bloques'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Nombre', sortable: false },
        ],
        items: [

        ]
      }
    },
    components: {
      Form,
      Table, 
      Pagination
    },
  }
</script>