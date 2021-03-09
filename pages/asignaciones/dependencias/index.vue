<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="dependencia.titulo" :dependencia="dependencia.data" :url="dependencia.url" :textBtn="dependencia.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(dependencia, i) in dependencias" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Dependencia :dependencia="dependencia" @getDependencia="getDependencia" @getDependencias="getDependencias" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListDependencias" />
  </div>
</template>
<script>
  import Form from '~/components/Dependencias/FormDependencia';
  import Dependencia from '~/components/Dependencias/CardDependencia';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Dependencias',
      }
    },
    data() {
      return {
        dependencia: {
          titulo: 'Nueva Dependencia',
          data: {},
          url: 'api/asignacion/dependencias',
          textBtn: 'Registrar'
        },
        dependencias: [
          { id: 1, nombre: 'Dependencia 1' }
        ],
        page: {
          current: 1,
          last: 0,
          url: 'api/asignacion/dependencias/i/10?page='
        }
      }
    },
    components: {
      Form,
      Dependencia,
      Pagination
    },
    async created() {
      this.$store.commit('SET_LOADING', true);
      await this.getDependencias();
      setTimeout(() => {
        this.$store.commit('SET_LOADING', false);
      }, 1000);
    },
    methods: {
      async getDependencias() {
        const { data } = await this.$axios.$get(`api/asignacion/dependencias/i/10?page=${this.page.current}`);
        this.dependencias = data.data;
        this.page.last = data.last_page;
      },
      updateListDependencias(dependencias) {
        this.dependencias = dependencias.data;
        this.page.current = dependencias.current;
      },
      getDependencia(dependencia) {
        this.dependencia.titulo = 'Actualizar Dependencia';
        this.dependencia.data = dependencia;
        this.dependencia.url = `api/asignacion/dependencias/${dependencia.id}`;
        this.dependencia.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.dependencia.titulo = 'Nueva Dependencia';
        this.dependencia.data = {};
        this.dependencia.url = 'api/asignacion/dependencias';
        this.dependencia.textBtn = 'Registrar';
        await this.getDependencias();
      }
    }
  }
</script>
