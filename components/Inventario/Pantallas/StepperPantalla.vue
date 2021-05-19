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
          color="#7BC142"
          editable>
          {{ step.titulo }}
          <small v-if="step.opcional">Opcional</small>
          <small v-else>Obligatorio</small>
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
  /**
    * @module components/Inventario/Pantallas/StepperPantalla
  */
  import Loader from '~/components/Site/Loader';
  import Alert from '~/components/Site/SweetAlert';
  import Marca from '~/components/Inventario/Marcas/FormMarca';
  import Pantalla from '~/components/Inventario/Pantallas/FormPantalla';
  /**
   * @vue-data {Number} paso - v-model del componente v-stepper.
   * @vue-data {Array} pasos - Lista que configura los v-stepper-step.
   * @vue-data {Object} form - Almacena la información de la pantalla.
   * @vue-data {Object} marca - Almacena la información de la marca.
   * @vue-data {Boolean} showMarcas - Valida si se muestra o no el input marcas en el componente Pantalla.
   * @vue-data {Boolean} isLoading - Valida si se muestra o no el componente de carga.
   * @vue-prop {String} titulo - Titulo renderizado en el componente Alert.
   * @vue-prop {String} url - Url ejecutada en las peticiones http del componente.
   * @vue-prop {Object} data - Información de la pantalla traido desde el componente padre.
   * @vue-event {Object} setMarca - Setea las variables marca y showMarcas.
   * @vue-event {} setShowMarcas - Setea las variable showMarcas.
   * @vue-event {Object} setPantalla - Setea las variable form y valida si se va a realizar un POST o un PUT sobre la información.
   * @vue-event {Object} setMarcaPantalla - Setea las variables marca y showMarcas.
   * @vue-event {} storePantalla - Realiza el POST sobre pantalla.
   * @vue-event {} updatePantalla - Realiza el PUT sobre pantalla.
   * @vue-event {} clearForm - Setea todas las variables del componente.
  */
  export default {
    data() {
      return {
        paso: 1,
        pasos: [
          { titulo: 'Marca', step: 1, opcional: true },
          { titulo: 'Pantalla', step: 2, opcional: false },
        ],
        form: {
          pulgadas: '',
          tipo: '',
          marca_id: ''
        },
        marca: {},
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
        this.marca = marca;
        this.showMarcas = false;
        this.paso += 1;
      },
      setShowMarcas() {
        this.showMarcas = true;
        this.paso += 1;
      },
      setPantalla(pantalla) {
        this.form = pantalla;
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
      async setMarcaPantalla() {
        if (Object.keys(this.marca).length !== 0) {
          const marca = await this.$axios.$post('api/inventario/marcas', this.marca);
          this.form.marca_id = marca.data.id;
        }
      },
      async storePantalla() {
        await this.setMarcaPantalla();
        const { descripcion } = await this.$axios.$post(this.url, this.form);
        return descripcion;
      },
      async updatePantalla() {
        await this.setMarcaPantalla();
        const { descripcion } = await this.$axios.$put(this.url, this.form);
        return descripcion;
      },
      clearForm() {
        this.paso = 1;
        this.form.pulgadas = '';
        this.form.tipo = '';
        this.form.marca_id = '';
        this.marca = {};
        this.showMarcas = false;
        this.$refs.marca.resetData();
        this.$refs.pantalla.resetData();
      }
    },
    /**
      * Watch Events:
      * @property {Function} data - Setea las variables del componente.
    */
    watch: {
      data() {
        if (Object.keys(this.data).length > 0) {
          this.form.pulgadas = this.data.pulgadas;
          this.form.tipo = this.data.tipo;
          this.form.marca_id = this.data.marca_id;
          this.showMarcas = true;
          this.paso = 2;
        }
      }
    }
  }
</script>
