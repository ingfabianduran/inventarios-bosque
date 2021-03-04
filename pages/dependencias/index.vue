<template>
  <div>
    <v-row>
      <v-col>
        <Form />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import Form from '~/components/Dependencias/FormDependencia';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Dependencias'
      }
    },
    components: {
      Form,
      Pagination
    },
  }
</script>