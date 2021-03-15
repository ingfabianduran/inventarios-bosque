<template>
  <div>
    <v-row>
      <v-col
        sm="12"
        md="8"
        lg="8"
        xl="8">
        <Form :titulo="categoria.titulo" :categoria="categoria.data" :url="categoria.url" :textBtn="categoria.textBtn" @clearForm="clearForm" />
      </v-col>
      <v-col
        sm="12"
        md="4"
        lg="4"
        xl="4">
        <Busqueda nameBusqueda="Nombre de la categoria" url="api/mantenimiento/categorias/buscar/nombre/" @searchModel="searchListCategorias" @resetBusqueda="$fetch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(categoria, i) in categorias" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Categoria :model="categoria" url="/api/mantenimiento/categorias/" @getModel="getCategoria" @getModels="$fetch" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListCategorias" />
  </div>
</template>
<script>
  import Form from '~/components/Mantenimiento/Categorias/FormCategoria';
  import Busqueda from '~/components/Site/CardSearch';
  import Categoria from '~/components/Site/SimpleCard';
  import Pagination from '~/components/Site/Pagination';

  export default {
    head() {
      return {
        title: 'Categorias'
      }
    },
    data() {
      return {
        categoria: {
          titulo: 'Nueva Categoria',
          data: {},
          url: 'api/mantenimiento/categorias',
          textBtn: 'Registrar'
        },
        categorias: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/mantenimiento/categorias/i/10?page='
        }
      }
    },
    components: {
      Form,
      Busqueda,
      Categoria,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/mantenimiento/categorias/i/10?page=${this.page.current}`);
      this.categorias = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/mantenimiento/categorias/i/10?page=';
    },
    methods: {
      updateListCategorias(categorias) {
        this.categorias = categorias.data;
        this.page.current = categorias.current;
      },
      getCategoria(categoria) {
        this.categoria.titulo = 'Actualizar Categoria';
        this.categoria.data = categoria;
        this.categoria.url = `api/mantenimiento/categorias/${categoria.id}`;
        this.categoria.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.categoria.titulo = 'Nueva Categoria';
        this.categoria.data = {};
        this.categoria.url = 'api/mantenimiento/categorias';
        this.categoria.textBtn = 'Registrar';
        this.$fetch();
      },
      searchListCategorias(categorias) {
        this.categorias = categorias.data.data;
        this.page.current = 1;
        this.page.last = categorias.data.last_page;
        this.page.url = categorias.url;
      },
    }
  }
</script>
