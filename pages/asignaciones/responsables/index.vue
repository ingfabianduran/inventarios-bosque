<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="responsable.titulo" :responsable="responsable.data" :url="responsable.url" :textBtn="responsable.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table title="Responsables" :headers="headers" :items="responsables" url="api/asignacion/responsables/" @getModel="getResponsable" @updateModels="getResponsables" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListResponsables" />
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
        responsable: {
          titulo: 'Nuevo Responsable',
          data: {},
          url: 'api/asignacion/responsables',
          textBtn: 'Registrar'
        },
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Nombre', value: 'nombre', sortable: false },
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Extension', value: 'extension', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        responsables: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/asignacion/responsables/i/10?page='
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
      await this.getResponsables();
      setTimeout(() => {
        this.$store.commit('SET_LOADING', false);
      }, 1000);
    },
    methods: {
      async getResponsables() {
        const { data } = await this.$axios.$get(`api/asignacion/responsables/i/10?page=${this.page.current}`);
        this.responsables = data.data;
        this.page.last = data.last_page;
      },
      updateListResponsables(responsables) {
        this.responsables = responsables.data;
        this.page.current = responsables.current;
      },
      getResponsable(responsable) {
        this.responsable.titulo = 'Actualizar Responsable';
        this.responsable.data = responsable;
        this.responsable.url = `api/asignacion/responsables/${responsable.id}`;
        this.responsable.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.responsable.titulo = 'Nuevo Responsable';
        this.responsable.data = {};
        this.responsable.url = 'api/asignacion/responsables';
        this.responsable.textBtn = 'Registrar';
        await this.getResponsables();
      }
    }
  }
</script>
