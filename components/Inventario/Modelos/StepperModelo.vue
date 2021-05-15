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
        <Modelo ref="modelo" @getModelo="setModelo" :marca="showMarcas" :procesador="showProcesadores" :modelo="data" @clearForm="clearForm" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  /**
    * @module components/Inventario/Modelos/StepperModelo
  */
  import Loader from '~/components/Site/Loader';
  import Procesador from '~/components/Inventario/Procesadores/FormProcesadores';
  import Marca from '~/components/Inventario/Marcas/FormMarca';
  import Modelo from '~/components/Inventario/Modelos/FormModelo';
  import Alert from '~/components/Site/SweetAlert';
  /**
   * @vue-data {Number} paso - v-model del componente v-stepper.
   * @vue-data {Array} pasos - Lista que configura los v-stepper-step.
   * @vue-data {Object} form - Almacena la información del modelo.
   * @vue-data {Object} marca - Almacena la información de la marca.
   * @vue-data {Object} procesador - Almacena la información del procesador.
   * @vue-data {Boolean} showMarcas - Valida si se muestra o no el input marcas en el componente Modelo.
   * @vue-data {Boolean} showProcesadores - Valida si se muestra o no el input procesadores en el componente Modelo.
   * @vue-data {Boolean} isLoading - Valida si se muestra o no el componente de carga.
   * @vue-prop {String} titulo - Titulo renderizado en el componente Alert.
   * @vue-prop {String} url - Url ejecutada en las peticiones http del componente.
   * @vue-prop {Object} data - Información del modelo traido desde el componente padre.
   * @vue-event {Object} setProcesador - Setea las variables procesador y showProcesadores.
   * @vue-event {Object} setMarca - Setea las variables marca y showMarcas.
   * @vue-event {} setShowMarcas - Setea las variable showMarcas.
   * @vue-event {} setShowProcesadores - Setea las variable showProcesadores.
   * @vue-event {Object} setModelo - Setea las variable form y valida si se va a realizar un POST o un PUT sobre la información.
   * @vue-event {} setMarcaProcesador - Valida si se desea crear una nueva marca o procesaodor si se ha registrado algo en los formularios Marca y procesador.
   * @vue-event {} storeModelo - Realiza el POST sobre modelo.
   * @vue-event {} updateModelo - Realiza el PUT sobre modelo.
   * @vue-event {} clearForm - Setea todas las variables del componente.
  */
  export default {
    data() {
      return {
        paso: 1,
        pasos: [
          { titulo: 'Marca', step: 1, opcional: true },
          { titulo: 'Procesador', step: 2, opcional: true },
          { titulo: 'Modelo', step: 3, opcional: false }
        ],
        form: {
          descripcion: '',
          tipo: '',
          modulos_memoria: '',
          marca_id: '',
          procesador_id: '',
        },
        marca: {},
        procesador: {},
        showMarcas: true,
        showProcesadores: true,
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
      Procesador,
      Modelo
    },
    methods: {
      setProcesador(procesador) {
        this.procesador = procesador;
        this.showProcesadores = false;
        this.paso += 1;
      },
      setMarca(marca) {
        this.marca = marca;
        this.showMarcas = false;
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
      setModelo(modelo) {
        this.form = modelo;
        Alert.showConfirm(this.titulo, '¿Esta seguro de realizar la petición?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const descripcion = (this.titulo === 'Nuevo Modelo' ? await this.storeModelo() : await this.updateModelo());
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
      async setMarcaProcesador() {
        if (Object.keys(this.marca).length !== 0 && Object.keys(this.procesador).length !== 0) {
          const marca = await this.$axios.$post('api/inventario/marcas', this.marca);
          const procesador = await this.$axios.$post('api/inventario/procesadores', this.procesador);
          this.form.marca_id = marca.data.id;
          this.form.procesador_id = procesador.data.id;
        } else if (Object.keys(this.procesador).length !== 0) {
          const procesador = await this.$axios.$post('api/inventario/procesadores', this.procesador);
          this.form.procesador_id = procesador.data.id;
        } else if (Object.keys(this.marca).length !== 0) {
          const marca = await this.$axios.$post('api/inventario/marcas', this.marca);
          this.form.marca_id = marca.data.id;
        }
      },
      async storeModelo() {
        await this.setMarcaProcesador();
        const { descripcion } = await this.$axios.$post(this.url, this.form);
        return descripcion;
      },
      async updateModelo() {
        await this.setMarcaProcesador();
        const { descripcion } = await this.$axios.$put(this.url, this.form);
        return descripcion;
      },
      clearForm() {
        this.paso = 1;
        this.form.descripcion = '';
        this.form.tipo = '';
        this.form.modulos_memoria = '';
        this.form.marca_id = '';
        this.form.procesador_id = '';
        this.procesador = {};
        this.modelo = {};
        this.showMarcas = false;
        this.showProcesadores = false;
        this.$refs.marca.resetData();
        this.$refs.procesador.resetData();
        this.$refs.modelo.resetData();
      }
    },
    /**
      * Watch Events:
      * @property {Function} data - Setea las variables del componente.
    */
    watch: {
      data() {
        if (Object.keys(this.data).length > 0) {
          this.form.descripcion = this.data.descripcion;
          this.form.tipo = this.data.tipo;
          this.form.modulos_memoria = this.data.modulos_memoria;
          this.form.marca_id = this.data.marca_id;
          this.form.procesador_id = this.data.procesador_id;
          this.showMarcas = true;
          this.showProcesadores = true;
          this.paso = 3;
        }
      }
    }
  }
</script>
