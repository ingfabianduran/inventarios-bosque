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
        <Pantalla ref="pantalla" :pantalla="data" :marca="showMarcas" @getPantalla="setPantalla" @clearForm="clearForm" />
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
        showMarcas: true,
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true,
      },
      data: {
        type: Object,
        required: true
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
        this.showMarcas = false;
        this.paso += 1;
      },
      setShowMarcas() {
        this.showMarcas = true;
        this.paso += 1;
      },
      setPantalla(pantalla) {
        this.pantalla.pantalla = pantalla;
        Alert.showConfirm(this.titulo, '¿Esta seguro de realizar la peticion?', 'question', async(confirm) => {
          if (confirm) {
            try {
              this.isLoading = true;
              const descripcion = (this.titulo === 'Nueva Pantalla' ? await this.storePantalla() : await this.updatePantalla());
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.clearForm();
                this.$emit('clearForm');
              }, 500);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      async storePantalla() {
        if (this.pantalla.pantalla.marca_id === '') {
          const marca = await this.$axios.$post('api/inventario/marcas', this.pantalla.marca);
          this.pantalla.pantalla.marca_id = marca.data.id;
        }
        const { descripcion } = await this.$axios.$post(this.url, this.pantalla.pantalla);
        return descripcion;
      },
      async updatePantalla() {
        const { descripcion } = await this.$axios.$put(this.url, this.pantalla.pantalla);
        return descripcion;
      },
      clearForm() {
        this.paso = 1;
        this.pantalla.marca = null;
        this.pantalla.pantalla = null;
        this.showMarcas = false;
        this.$refs.marca.resetData();
        this.$refs.pantalla.resetData();
      }
    },
    watch: {
      data() {
        if (Object.keys(this.data).length > 0) {
          this.pantalla.pantalla = this.data;
          this.showMarcas = true;
          this.paso = 2;
        }
      }
    }
  }
</script>
