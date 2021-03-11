<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="especialista.titulo" :especialista="especialista.data" :url="especialista.url" :textBtn="especialista.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table title="Especialistas" :headers="headers" :items="especialistas" url="api/matenimientos/usuarios/" @getModel="getEspecialista" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListEspecialistas" />
  </div>
</template>
<script>
  import Form from '~/components/Mantenimiento/Especialistas/FormEspecialista';
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
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Nombres', value: 'nombres', sortable: false },
          { text: 'Apellidos', value: 'apellidos', sortable: false },
          { text: 'Rol', value: 'rol', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        especialista: {
          titulo: 'Nuevo Especialista',
          data: {},
          url: 'api/matenimientos/usuarios',
          textBtn: 'Registrar'
        },
        especialistas: [
          { id: 1, nombres: 'Fabian Esteban', apellidos: 'Duran Avellaneda', rol: 'Coordinador' }
        ],
        page: {
          current: 1,
          last: 0,
          url: 'api/matenimientos/usuarios/i/10?page='
        }
      }
    },
    components: {
      Form,
      Table,
      Pagination
    },
    methods: {
      async getEspecialistas() {
        const { data } = await this.$axios.$get(`api/matenimientos/usuarios/i/10?page=${this.page.current}`);
        this.especialistas = data.data;
        this.page.last = data.last_page;
      },
      updateListEspecialistas(especialistas) {
        this.especialistas = especialistas.data;
        this.page.current = especialistas.current;
      },
      getEspecialista(especialista) {
        this.especialista.titulo = 'Actualizar Especialista';
        this.especialista.data = especialista;
        this.especialista.url = `api/matenimientos/usuarios/${especialista.id}`;
        this.especialista.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.especialista.titulo = 'Nuevo Especialista';
        this.especialista.data = {};
        this.especialista.url = 'api/matenimientos/usuarios';
        this.especialista.textBtn = 'Registrar';
        await this.getEspecialistas();
      }
    }
  }
</script>
