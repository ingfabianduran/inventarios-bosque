<template>
  <div>
    <v-row>
      <v-col>
        <Form />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table title="Especialistas" :headers="headers" :items="items" />
      </v-col>
    </v-row>
    <Pagination />
  </div>
</template>
<script>
  import Form from '~/components/Especialistas/FormEspecialista';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Especialistas'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Nombres', sortable: false },
          { text: 'Apellidos', sortable: false },
          { text: 'Rol', sortable: false }
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