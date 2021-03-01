<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="espacio.titulo" :espacio="espacio.data" :textBtn="espacio.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(espacio, i) in espacios"
        :key="i"
        sm="12"
        md="6"
        lg="4"
        xl="4">
        <Espacio :espacio="espacio" @getEspacio="getEspacio" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEspacios" />
  </div>
</template>
<script>
  import Form from '~/components/Espacios/FormEspacio';
  import Espacio from '~/components/Espacios/CardEspacios';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Espacios'
      }
    },
    data() {
      return {
        espacio: {
          titulo: 'Nuevo Espacio',
          data: {},
          textBtn: 'Registrar'
        },
        espacios: [],
        page: {
          last: 0,
          url: 'api/asignacion/espacios/i/10?page='
        }
      }
    },
    components: {
      Form,
      Espacio, 
      Pagination
    },
    async created() {
      await this.getEspacios();
    },
    methods: {
      async getEspacios() {
        const { data, last_page } = await this.$axios.$get('http://localhost:8000/api/asignacion/espacios/i/10');
        this.espacios = data;
        this.page.last = last_page;
      },
      updateListEspacios(espacios) {
        this.espacios = espacios;
      },
      getEspacio(espacio) {
        this.espacio.titulo = 'Actualizar Espacio';
        this.espacio.data = espacio;
        this.espacio.textBtn = 'Actualizar';
      },
      clearForm() {
        this.espacio = {
          titulo: 'Nuevo Espacio',
          data: {},
          textBtn: 'Registrar'
        };
      }
    }
  }
</script>