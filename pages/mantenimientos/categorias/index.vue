<template>
  <div>
    <v-row>
      <v-col>
        <Form :titulo="categoria.titulo" :especialista="categoria.data" :url="categoria.url" :textBtn="categoria.textBtn" @clearForm="clearForm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(categoria, i) in categorias" :key="i"
        sm="12"
        md="6"
        lg="6"
        xl="4">
        <Categoria :model="categoria" url="/api/mantenimientos/categorias/" @getModel="getCategoria" @getModels="getCategorias" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListCategorias" />
  </div>
</template>
<script>
  import Form from '~/components/Mantenimiento/Categorias/FormCategoria';
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
          url: 'api/mantenimientos/categorias',
          textBtn: 'Registrar'
        },
        categorias: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/mantenimientos/categorias/i/10?page='
        }
      }
    },
    components: {
      Form,
      Categoria,
      Pagination
    },
    methods: {
      async getCategorias() {
        const { data } = await this.$axios.$get(`api/mantenimientos/categorias/i/10?page=${this.page.current}`);
        this.categorias = data.data;
        this.page.last = data.last_page;
      },
      updateListCategorias(categorias) {
        this.categorias = categorias.data;
        this.page.current = categorias.current;
      },
      getCategoria(categoria) {
        this.categoria.titulo = 'Actualizar Categoria';
        this.categoria.data = categoria;
        this.categoria.url = `api/mantenimientos/categorias/${categoria.id}`;
        this.categoria.textBtn = 'Actualizar';
      },
      async clearForm() {
        this.categoria.titulo = 'Nueva Categoria';
        this.categoria.data = {};
        this.categoria.url = 'api/mantenimientos/categorias';
        this.categoria.textBtn = 'Registrar';
        await this.getCategorias();
      }
    }
  }
</script>
