<template>
  <v-stepper
    v-model="paso"
    alt-labels>
    <v-stepper-header>
      <template v-for="(step, i) in pasos">
        <v-stepper-step
          :key="`${i}-step`"
          :complete="paso > step.step"
          :step="step.step"
          color="#7BC142">
          {{ step.titulo }}
          <small v-if="step.opcional">Opcional</small>
        </v-stepper-step>
        <v-divider
          v-if="i !== 2"
          :key="i">
        </v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content
        step="1">
        <Marca @getMarca="setMarca" @omitir="setShowMarcas" @clearForm="clearForm" />
      </v-stepper-content>
      <v-stepper-content
        step="2">
        <Procesador @getProcesador="setProcesador" @omitir="setShowProcesadores" @clearForm="clearForm" />
      </v-stepper-content>
      <v-stepper-content
        step="3">
        <Modelo :marcas="showMarcas" :procesadores="showProcesadores" @clearForm="clearForm" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  import Procesador from '~/components/Inventario/Procesadores/FormProcesadores';
  import Marca from '~/components/Inventario/Marcas/FormMarca';
  import Modelo from '~/components/Inventario/Modelos/FormModelo';

  export default {
    data() {
      return {
        paso: 1,
        pasos: [
          { titulo: 'Marca', step: 1, opcional: true },
          { titulo: 'Procesador', step: 2, opcional: true },
          { titulo: 'Modelo', step: 3, opcional: false }
        ],
        modelo: {
          marca: null,
          procesador: null,
          modelo: null
        },
        showMarcas: false,
        showProcesadores: false,
      }
    },
    components: {
      Marca,
      Procesador,
      Modelo
    },
    methods: {
      setProcesador(procesador) {
        this.modelo.procesador = procesador;
        this.paso += 1;
      },
      setMarca(marca) {
        this.modelo.marca = marca;
        this.paso += 1;
      },
      setShowMarcas() {
        this.showMarcas = true;
        this.paso += 1;
      },
      setShowProcesadores() {
        this.showProcesadores = true;
        this.paso += 1;
      },
      clearForm() {
        this.paso = 1;
        this.modelo.marca = null;
        this.modelo.procesador = null;
        this.modelo.modelo = null;
        this.showMarcas = false;
        this.showProcesadores = false;
      }
    }
  }
</script>
