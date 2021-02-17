<template>
  <div>
    <v-row>
      <v-col>
        <Form />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table title="Responsables" :headers="headers" :items="items" />
      </v-col>
    </v-row>
    <Pagination />
  </div>
</template>
<script>
  import Form from '~/components/Responsables/FormResponsable';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Responsables'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Nombre', sortable: false },
          { text: 'Tipo', sortable: false },
          { text: 'Extension', sortable: false },
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