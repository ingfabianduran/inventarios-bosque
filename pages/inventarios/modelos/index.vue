<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="3"
        lg="5">
        <Marca />
      </v-col>
      <v-col
        cols="12"
        md="9"
        lg="7">
        <Procesador />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Modelo />
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import Marca from '~/components/Inventario/Marcas/FormMarca';
  import Procesador from '~/components/Inventario/Procesadores/FormProcesadores';
  import Modelo from '~/components/Inventario/Modelos/FormModelo';

  export default {
    head() {
      return {
        title: 'Modelos'
      }
    },
    components: {
      Marca,
      Procesador,
      Modelo
    }
  }
</script>
