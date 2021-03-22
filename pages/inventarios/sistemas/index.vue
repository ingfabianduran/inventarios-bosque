<template>
  <div>
    <v-row
      align="center"
      justify="center">
      <v-col
        sm="12"
        md="8"
        lg="8"
        xl="8">
        <Form :titulo="sistema.titulo" :sistema="sistema.data" :url="sistema.url" :textBtn="sistema.textBtn" @clearForm="clearForm" />
      </v-col>
      <v-col
        sm="12"
        md="4"
        lg="4"
        xl="4">
        <Busqueda nameBusqueda="Nombre del sistema operativo" url="api/inventario/sistemaoperativos/buscar/" @searchModel="searchListSistemas" @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(sistema, i) in sistemas" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Sistema :model="sistema" url="api/inventario/sistemaoperativos/" @getModel="getSistema" @getModels="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListSistemas" />
  </div>
</template>
<script>
  import Form from '~/components/Inventario/Sistemas/FormSistema';
  import Busqueda from '~/components/Site/CardSearch';
  import Sistema from '~/components/Site/SimpleCard';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Sistemas Operativos'
      }
    },
    data() {
      return {
        sistema: {
          titulo: 'Nuevo Sistema',
          data: {},
          url: 'api/inventario/sistemaoperativos',
          textBtn: 'Registrar'
        },
        sistemas: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/inventario/sistemaoperativos/i/10?page='
        }
      }
    },
    components: {
      Form,
      Busqueda,
      Sistema,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/inventario/sistemaoperativos/i/10?page=${this.page.current}`);
      this.sistemas = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/inventario/sistemaoperativos/i/10?page=';
    },
    methods: {
      updateListSistemas(sistemas) {
        this.sistemas = sistemas.data;
        this.page.current = sistemas.current;
      },
      getSistema(sistema) {
        this.sistema.titulo = 'Actualizar Sistema';
        this.sistema.data = sistema;
        this.sistema.url = `/api/inventario/sistemaoperativos/${sistema.id}`;
        this.sistema.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.sistema.titulo = 'Nuevo Sistema';
        this.sistema.data = {};
        this.sistema.url = 'api/inventario/sistemaoperativos';
        this.sistema.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListSistemas(sistemas) {
        this.sistemas = sistemas.data.data;
        this.page.current = 1;
        this.page.last = sistemas.data.last_page;
        this.page.url = sistemas.url;
      },
    }
  }
</script>
