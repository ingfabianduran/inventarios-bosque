<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="espacio.titulo" :espacio="espacio.data" :url="espacio.url" :textBtn="espacio.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(espacio, i) in espacios"
        :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Espacio :espacio="espacio" @getEspacio="getEspacio" @getEspacios="getEspacios" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEspacios" />
  </div>
</template>
<script>
  import Form from '~/components/Espacios/FormEspacio';
  import Espacio from '~/components/Espacios/CardEspacio';
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
          url: 'api/asignacion/espacios',
          textBtn: 'Registrar'
        },
        espacios: [],
        page: {
          current: 1,
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
      this.$store.commit('SET_LOADING', true);
      await this.getEspacios();
      setTimeout(() => {
        this.$store.commit('SET_LOADING', false);
      }, 1000);
    },
    methods: {
      async getEspacios() {
        const { data }  = await this.$axios.$get(`api/asignacion/espacios/i/10?page=${this.page.current}`);
        this.espacios = data.data;
        this.page.last = data.last_page;
      },
      updateListEspacios(espacios) {
        this.espacios = espacios.data;
        this.page.current = espacios.current;
      },
      getEspacio(espacio) {
        this.espacio.titulo = 'Actualizar Espacio';
        this.espacio.data = espacio;
        this.espacio.url = `api/asignacion/espacios/${espacio.id}`
        this.espacio.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.espacio.titulo = 'Nuevo Espacio';
        this.espacio.data = {};
        this.espacio.url = 'api/asignacion/espacios';
        this.espacio.textBtn = 'Registrar';
        await this.getEspacios();
      }
    }
  }
</script>