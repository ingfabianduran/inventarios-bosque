<template>
  <v-stepper
    v-model="paso"
    alt-labels>
    <Loader :isShow="isLoading" color="#212121" size="90" />
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
        <Marca ref="marca" @getMarca="setMarca" @omitir="setShowMarcas" @clearForm="clearForm" />
      </v-stepper-content>
      <v-stepper-content
        step="2">
        <Procesador ref="procesador" @getProcesador="setProcesador" @omitir="setShowProcesadores" @clearForm="clearForm" />
      </v-stepper-content>
      <v-stepper-content
        step="3">
        <Modelo ref="modelo" @getModelo="storeModelo" :marca="showMarcas" :procesador="showProcesadores" @clearForm="clearForm" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  import Loader from '~/components/Site/Loader';
  import Procesador from '~/components/Inventario/Procesadores/FormProcesadores';
  import Marca from '~/components/Inventario/Marcas/FormMarca';
  import Modelo from '~/components/Inventario/Modelos/FormModelo';
  import Alert from '~/components/Site/SweetAlert';

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
        isLoading: false
      }
    },
    components: {
      Loader,
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
      storeModelo(modelo) {
        this.modelo.modelo = modelo;
        Alert.showConfirm('Agregar Modelo', '¿Esta seguro de realizar la petición?', 'question', async(confirm) => {
          if (confirm) {
            try {
              this.isLoading = true;
              if (this.modelo.modelo.marca_id === '' && this.modelo.modelo.procesador_id === '') {
                const marca = await this.$axios.$post('api/inventario/marcas', this.modelo.marca);
                const procesador = await this.$axios.$post('api/inventario/procesadores', this.modelo.procesador);
                this.modelo.modelo.marca_id = marca.data.id;
                this.modelo.modelo.procesador_id = procesador.data.id;
              } else if (this.modelo.modelo.procesador_id === '') {
                const procesador = await this.$axios.$post('api/inventario/procesadores', this.modelo.procesador);
                this.modelo.modelo.procesador_id = procesador.data.id;
              } else if (this.modelo.modelo.marca_id === '') {
                const marca = await this.$axios.$post('api/inventario/marcas', this.modelo.marca);
                this.modelo.modelo.marca_id = marca.data.id;
              }
              const { descripcion } = await this.$axios.$post('api/inventario/modelos', this.modelo.modelo);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.clearForm();
                this.$emit('listModelos');
              }, 500);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      clearForm() {
        this.paso = 1;
        this.modelo.marca = null;
        this.modelo.procesador = null;
        this.modelo.modelo = null;
        this.showMarcas = false;
        this.showProcesadores = false;
        this.$refs.marca.resetData();
        this.$refs.procesador.resetData();
        this.$refs.modelo.resetData();
      }
    }
  }
</script>
