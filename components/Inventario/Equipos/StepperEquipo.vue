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
          color="#7BC142"
          editable>
          {{ step.titulo }}
          <small v-if="step.opcional">Opcional</small>
          <small v-else>Obligatorio</small>
        </v-stepper-step>
        <v-divider
          v-if="i !== 5"
          :key="i">
        </v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content
        step="1">
        <Disco ref="disco" @getDisco="setDisco" @omitirDisco="omitirDisco" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="2">
        <Memoria ref="memoria" @getMemoria="setMemoria" @omitirMemoria="omitirMemoria" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="3">
        <Equipo :equipo="data" ref="equipo" :showDiscos="showDiscos" :showMemorias="showMemorias" @getEquipo="setEquipo" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="4">
        <Inventario :inventario="data.inventario" ref="inventario" @getInventario="setInventario" @omitir="omitir" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="5">
        <Caracteristica :caracteristica="data.caracteristica" ref="caracteristica" @getCaracteristica="setCaracteristica" @omitir="omitir" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="6">
        <Red :redes="data.macs" ref="red" @getMacs="setMacs" @clearForm="cancelarRegistro" />
        <Loader :isShow="isLoading" color="#212121" size="80" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  import Disco from '~/components/Inventario/Discos/FormDisco';
  import Memoria from '~/components/Inventario/Memorias/FormMemoria';
  import Equipo from '~/components/Inventario/Equipos/FormEquipo';
  import Inventario from '~/components/Inventario/Inventarios/FormInventario';
  import Caracteristica from '~/components/Inventario/Caracteristicas/FormCaracteristica';
  import Red from '~/components/Inventario/Redes/FormRed';
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';
  import moment from 'moment';

  export default {
    data() {
      return {
        paso: 1,
        pasos: [
          { titulo: 'Disco Duro', step: 1, opcional: true },
          { titulo: 'Memoria Ram', step: 2, opcional: true },
          { titulo: 'Equipo', step: 3, opcional: false },
          { titulo: 'Inventario', step: 4, opcional: true },
          { titulo: 'Caracteristicas', step: 5, opcional: true },
          { titulo: 'Redes', step: 6, opcional: true },
        ],
        form: {
          fecha_compra: '',
          vence_garantia: '',
          tipo: '',
          serie: '',
          valor: '',
          modelo_id: '',
          disco_id: '',
          memoria_id: '',
          inventario: {},
          caracteristica: {},
          mac: [],
        },
        disco: {},
        memoria: {},
        showDiscos: true,
        showMemorias: true,
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
      Disco,
      Memoria,
      Equipo,
      Inventario,
      Caracteristica,
      Red,
      Loader
    },
    methods: {
      setDisco(disco) {
        this.disco = disco;
        this.showDiscos = false;
        this.paso += 1;
      },
      setMemoria(memoria) {
        this.memoria = memoria;
        this.showMemorias = false;
        this.paso += 1;
      },
      setEquipo(equipo) {
        this.form.fecha_compra = equipo.fecha_compra;
        this.form.vence_garantia = equipo.vence_garantia;
        this.form.tipo = equipo.tipo;
        this.form.serie = equipo.serie;
        this.form.valor = equipo.valor;
        this.form.modelo_id = equipo.modelo_id;
        this.form.disco_id = equipo.disco_id;
        this.form.memoria_id = equipo.memoria_id;
        this.paso += 1;
      },
      setInventario(inventario) {
        this.form.inventario = inventario;
        this.paso += 1;
      },
      setCaracteristica(caracteristica) {
        this.form.caracteristica = caracteristica;
        this.paso += 1;
      },
      setMacs(macs) {
        this.form.mac = macs;
        this.setInfoEquipo();
      },
      omitirDisco() {
        this.showDiscos = true;
        this.paso += 1;
      },
      omitirMemoria() {
        this.showMemorias = true;
        this.paso += 1;
      },
      omitir() {
        if (this.paso !== 6) this.paso += 1;
      },
      async setDiscoMemoria() {
        if (Object.keys(this.disco).length !== 0 && Object.keys(this.memoria).length !== 0) {
          const disco = await this.$axios.$post('api/inventario/discos', this.disco);
          const memoria = await this.$axios.$post('api/inventario/memorias', this.memoria);
          this.form.disco_id = disco.data.id;
          this.form.memoria_id = memoria.data.id;
        } else if (Object.keys(this.disco).length !== 0) {
          const disco = await this.$axios.$post('api/inventario/discos', this.disco);
          this.form.disco_id = disco.data.id;
        } else if (Object.keys(this.memoria).length !== 0) {
          const memoria = await this.$axios.$post('api/inventario/memorias', this.memoria);
          this.form.memoria_id = memoria.data.id;
        }
      },
      setInfoEquipo() {
        Alert.showConfirm(this.titulo, '¿Esta seguro de realizar la petición?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const descripcion = (this.titulo === 'Nuevo Equipo') ? await this.storeEquipo() : await this.updateEquipo();
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.cancelarRegistro();
              }, 500);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      async storeEquipo() {
        await this.setDiscoMemoria();
        const { descripcion } = await this.$axios.$post(this.url, this.form);
        return descripcion;
      },
      async updateEquipo() {
        await this.setDiscoMemoria();
        const { descripcion } = await this.$axios.$put(this.url, this.form);
        return descripcion;
      },
      cancelarRegistro() {
        this.$refs.disco.resetData();
        this.$refs.memoria.resetData();
        this.$refs.equipo.resetData();
        this.$refs.inventario.resetData();
        this.$refs.caracteristica.resetData();
        this.$refs.red.resetData();

        this.disco = {};
        this.memoria = {};
        this.showDiscos = true,
        this.showMemorias = true,
        this.form.fecha_compra = '';
        this.form.vence_garantia = '';
        this.form.tipo = '';
        this.form.serie = '';
        this.form.valor = '';
        this.form.modelo_id = '';
        this.form.disco_id = '';
        this.form.memoria_id = '';

        this.form.inventario = {};
        this.form.caracteristica = {};
        this.form.mac = [];

        this.paso = 1;
        this.$emit('clearForm');
      }
    },
    watch: {
      data() {
        if (Object.keys(this.data).length > 0) {
          this.paso = 3;
          this.form.fecha_compra = moment(this.data.fecha_compra).format('DD-MM-YYYY');
          this.form.vence_garantia = moment(this.data.vence_garantia).format('DD-MM-YYYY');
          this.form.tipo = this.data.tipo;
          this.form.serie = this.data.serie;
          this.form.valor = this.data.valor;
          this.form.modelo_id = this.data.modelo.id;
          this.form.disco_id = this.data.disco.id;
          this.form.memoria_id = this.data.memoria.id;
          if (this.data.inventario !== null) {
            this.form.inventario = {
              n_interno: this.data.inventario.n_interno,
              inventario: this.data.inventario.inventario
            };
          }
          if (this.data.caracteristica !== null) {
            this.form.caracteristica = {
              usuario_dominio: this.data.caracteristica.usuario_dominio,
              nombre_red: this.data.caracteristica.nombre_red,
              perifericos: this.data.caracteristica.perifericos,
              observaciones: this.data.caracteristica.observaciones
            };
          }
          this.form.mac = this.data.macs.map((mac) => {
            return { tipo: mac.tipo, mac: mac.mac };
          });
        }
      },
    }
  }
</script>
