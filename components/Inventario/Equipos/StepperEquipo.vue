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
        <Equipo ref="equipo" :showDiscos="showDiscos" :showMemorias="showMemorias" @getEquipo="setEquipo" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="4">
        <Inventario ref="inventario" @getInventario="setInventario" @omitir="omitir" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="5">
        <Caracteristica ref="caracteristica" @getCaracteristica="setCaracteristica" @omitir="omitir" @clearForm="cancelarRegistro" />
      </v-stepper-content>
      <v-stepper-content
        step="6">
        <Red ref="red" @getMacs="setMacs" @omitir="omitir" @clearForm="cancelarRegistro" />
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
          pantallas: [],
          sistema_operativos: [],
          software: []
        },
        disco: {},
        memoria: {},
        showDiscos: false,
        showMemorias: false
      }
    },
    props: {
      url: {
        type: String,
        required: true,
      },
      equipo: {
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
      Red
    },
    methods: {
      setDisco(disco) {
        this.disco = disco;
        this.showDiscos = false;
      },
      setMemoria(memoria) {
        this.memoria = memoria;
        this.showMemorias = false;
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
        this.paso += 1;
      },
      cancelarRegistro() {
        this.$refs.disco.resetData();
        this.$refs.memoria.resetData();
        this.$refs.equipo.resetData();
        this.$refs.inventario.resetData();
        this.$refs.caracteristica.resetData();
        this.$refs.red.resetData();

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
        this.form.pantallas = [];
        this.form.sistema_operativos = [];
        this.form.software = [];

        this.paso = 1;
      }
    },
    watch: {
      paso(value) {
        if (value > 6) {
          // Registro o actualizacion
        }
      }
    }
  }
</script>
