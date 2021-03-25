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
          v-if="i !== 1"
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
        <Pantalla ref="pantalla" :marca="showMarcas" @getPantalla="storePantalla" @clearForm="clearForm" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  import Loader from '~/components/Site/Loader';
  import Alert from '~/components/Site/SweetAlert';
  import Marca from '~/components/Inventario/Marcas/FormMarca';
  import Pantalla from '~/components/Inventario/Pantallas/FormPantalla';

  export default {
    data() {
      return {
        paso: 1,
        pasos: [
          { titulo: 'Marca', step: 1, opcional: true },
          { titulo: 'Pantalla', step: 2, opcional: false },
        ],
        pantalla: {
          marca: null,
          pantalla: null
        },
        showMarcas: false,
        isLoading: false
      }
    },
    components: {
      Loader,
      Marca,
      Pantalla
    },
    methods: {
      setMarca(marca) {
        this.pantalla.marca = marca;
        this.paso += 1;
      },
      setShowMarcas() {
        this.showMarcas = true;
        this.paso += 1;
      },
      storePantalla(pantalla) {
        this.pantalla.pantalla = pantalla;
        Alert.showConfirm('Agregar Pantalla', '¿Esta seguro de realizar la peticion?', 'question', async(confirm) => {
          if (confirm) {
            try {
              this.isLoading = true;
              if (this.pantalla.pantalla.marca_id === '') {
                const marca = await this.$axios.$post('api/inventario/marcas', this.pantalla.marca);
                this.pantalla.pantalla.marca_id = marca.data.id;
              }
              const { descripcion } = await this.$axios.$post('api/inventario/pantallas', this.pantalla.pantalla);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.clearForm();
                this.$emit('listPantallas');
              }, 500);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      clearForm() {
        this.paso = 1;
        this.pantalla.marca = null;
        this.pantalla.pantalla = null;
        this.showMarcas = false;
        this.$refs.marca.resetData();
        this.$refs.pantalla.resetData();
      }
    }
  }
</script>