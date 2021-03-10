<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="asignacion.titulo" :asignacion="asignacion.data" :url="asignacion.url" :textBtn="asignacion.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table title="Asignaciones" :headers="headers" :items="asignaciones" url="api/asignacion/asignaciones/" @getModel="getAsignacion" @updateModels="getAsignaciones" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListAsignaciones" />
  </div>
</template>
<script>
  import Form from '~/components/Asignaciones/FormAsignacion';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Asignaciones'
      }
    },
    data() {
      return {
        asignacion: {
          titulo: 'Nueva Asignación',
          data: {},
          url: 'api/asignacion/asignaciones',
          textBtn: 'Registrar'
        },
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Fecha', value: 'created_at', sortable: false },
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Responsable', value: 'responsable.nombre', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        asignaciones: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/asignacion/asignaciones/i/10?page='
        }
      }
    },
    components: {
      Form,
      Table,
      Pagination
    },
    async created() {
      this.$store.commit('SET_LOADING', true);
      await this.getAsignaciones();
      setTimeout(() => {
        this.$store.commit('SET_LOADING', false);
      }, 1000);
    },
    methods: {
      async getAsignaciones() {
        const { data } = await this.$axios.$get(`api/asignacion/asignaciones/i/10?page=${this.page.current}`);
        this.asignaciones = data.data;
        this.page.last = data.last_page;
      },
      updateListAsignaciones(asignaciones) {
        this.asignaciones = asignaciones.data;
        this.page.current = asignaciones.current;
      },
      getAsignacion(asignacion) {
        this.asignacion.titulo = 'Actualizar Asignación';
        this.asignacion.data = asignacion;
        this.asignacion.url = `api/asignacion/asignaciones/${asignacion.id}`;
        this.asignacion.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.asignacion.titulo = 'Nueva Asignación';
        this.asignacion.data = {};
        this.asignacion.url = 'api/asignacion/asignaciones';
        this.asignacion.textBtn = 'Registrar';
        await this.getAsignaciones();
      }
    }
  }
</script>
