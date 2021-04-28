<template>
  <div>
    <Equipo
      :dialog="dialogEquipo"
      @closeModal="closeModalEquipo"
      v-if="dialogEquipo.isView" />
    <v-card>
      <v-card-title
        class="font-weight-bold text-h4">
        {{ `Equipo ${this.dataEquipo[2].data[2].value}` }}
      </v-card-title>
      <v-card-subtitle>{{ this.dataEquipo[1].data[4].value }}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(equipo, i) in dataEquipo"
            :key="i"
            cols="12"
            :md="equipo.col">
            <v-card
              outlined>
              <v-toolbar
                color="#7BC142"
                dark>
                <v-toolbar-title
                  class="font-weight-bold text-h5">
                  {{ equipo.titulo }}
                </v-toolbar-title>
              </v-toolbar>
              <v-list
                dense>
                <v-list-item
                  v-for="(data, j) in equipo.data"
                  :key="j">
                  <v-list-item-content class="font-weight-bold">{{ data.titulo }}</v-list-item-content>
                  <v-list-item-content>{{ data.value }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-menu
          bottom
          origin="left"
          transition="scale-transition"
          v-if="showOpciones && !whenDeleteEquipo">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#F27830"
              dark
              v-bind="attrs"
              v-on="on"
              large>
              Mas Opciones
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(opc, i) in opciones"
              :key="i"
              link
              v-show="opc.show"
              @click="eventMasOpciones(opc.opcion)">
                <v-list-item-title
                  v-text="opc.text">
                </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
  import Equipo from '~/components/Inventario/Equipos/TabsEquipo';
  import Pdf from '~/components/Site/HojaVida';

  export default {
    data() {
      return {
        dataEquipo: [
          { titulo: 'Hardware', col: 3, data: [
            { titulo: 'Marca:', value: 'No consultado' },
            { titulo: 'Modelo:', value: 'No consultado' },
            { titulo: 'Procesador:', value: 'No consultado' },
            { titulo: 'Memoria RAM:', value: 'No consultado' },
            { titulo: 'Disco Duro:', value: 'No consultado' },
          ] },
          { titulo: 'Ubicación y Usuario', col: 3, data: [
            { titulo: 'Dependencia - Área:', value: 'No consultado' },
            { titulo: 'Ubicación:', value: 'No consultado' },
            { titulo: 'Nombre del responsable:', value: 'No consultado' },
            { titulo: 'Nombre de red:', value: 'No consultado' },
            { titulo: 'Usuario de dominio:', value: 'No consultado' },
          ] },
          { titulo: 'Placas y Seriales', col: 3, data: [
            { titulo: 'Numero interno:', value: 'No consultado' },
            { titulo: 'Placa de inventario:', value: 'No consultado' },
            { titulo: 'Serial:', value: 'No consultado' },
          ] },
          { titulo: 'Redes', col: 3, data: [
            { titulo: 'LAN:', value: 'No consultado' },
            { titulo: 'WAN:', value: 'No consultado' },
          ] },
        ],
        opciones: [
          { text: 'Agregar Equipo', opcion: 'agregarEquipo', show: (this.$auth.user.rol === 'COORDINADOR' ? true : false) },
          { text: 'Hoja de Vida', opcion: 'hojaVida', show: false },
          { text: 'Mas Información', opcion: 'masInformacion', show: false },
          { text: 'Modificar Equipo', opcion: 'modificarEquipo', show: false },
          { text: 'Reportes de Inventario', opcion: 'reporteInventario', show: (this.$auth.user.rol === 'COORDINADOR' ? true : false) },
        ],
        dialogEquipo: {
          isView: false,
          data: {}
        },
        showOpciones: (this.$auth.user.rol === 'COORDINADOR' ? true : false),
      }
    },
    props: {
      equipo: {
        type: Object,
        required: false
      },
      whenDeleteEquipo: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Equipo
    },
    methods: {
      closeModalEquipo(value) {
        this.dialogEquipo.isView = value;
      },
      closeModalReporte(value) {
        this.dialogReporte.isView = value;
      },
      async eventMasOpciones(opcion) {
        if (opcion === 'agregarEquipo') {
          this.$emit('addEquipo');
        } else if (opcion === 'hojaVida') {
          const { data } = await this.$axios.$get(`api/inventario/equipos/${this.equipo.id}`);
          Pdf.getHojaVida(data);
        } else if (opcion === 'masInformacion') {
          this.dialogEquipo.data = this.equipo;
          this.dialogEquipo.isView = true;
        } else if (opcion === 'modificarEquipo') {
          this.$emit('updateEquipo');
        } else if (opcion === 'reporteInventario') {
          this.$router.push('/inventarios/equipos/reportes');
        }
      }
    },
    watch: {
      equipo() {
        if (this.equipo.modelo !== null) {
          this.dataEquipo[0].data[0].value = this.equipo.modelo.marca.nombre;
          this.dataEquipo[0].data[1].value = this.equipo.modelo.descripcion;
          this.dataEquipo[0].data[2].value = this.equipo.modelo.procesador.nombre;
        }

        if (this.equipo.memoria !== null) {
          this.dataEquipo[0].data[3].value = this.equipo.memoria.capacidad;
        } else {
          this.dataEquipo[0].data[3].value = 'No registra';
        }

        if (this.equipo.disco !== null) {
          this.dataEquipo[0].data[4].value = this.equipo.disco.capacidad;
        } else {
          this.dataEquipo[0].data[4].value = 'No registra';
        }

        if (this.equipo.asignaciones.length > 0) {
          this.dataEquipo[1].data[0].value = (this.equipo.asignaciones[0].responsable.dependencia.nombre ? this.equipo.asignaciones[0].responsable.dependencia.nombre : 'No registrar');
          this.dataEquipo[1].data[1].value = (this.equipo.asignaciones[0].espacio.nombre ? this.equipo.asignaciones[0].espacio.nombre : 'No registra');
          this.dataEquipo[1].data[2].value = (this.equipo.asignaciones[0].responsable.nombre ? this.equipo.asignaciones[0].responsable.nombre : 'No registra');
        } else {
          this.dataEquipo[1].data[0].value = 'No registra';
          this.dataEquipo[1].data[1].value = 'No registra';
          this.dataEquipo[1].data[2].value = 'No registra';
        }

        if (this.equipo.caracteristica !== null) {
          this.dataEquipo[1].data[3].value = (this.equipo.caracteristica.nombre_red ? this.equipo.caracteristica.nombre_red : 'No registra');
          this.dataEquipo[1].data[4].value = (this.equipo.caracteristica.usuario_dominio ? this.equipo.caracteristica.usuario_dominio : 'No registra');
        } else {
           this.dataEquipo[1].data[3].value = 'No registra';
           this.dataEquipo[1].data[4].value = 'No registra';
        }

        if (this.equipo.inventario !== null) {
          this.dataEquipo[2].data[0].value = (this.equipo.inventario.n_interno ? this.equipo.inventario.n_interno : 'No registra');
          this.dataEquipo[2].data[1].value = (this.equipo.inventario.inventario ? this.equipo.inventario.inventario : 'No registra');
          this.dataEquipo[2].data[2].value = (this.equipo.serie ? this.equipo.serie : 'No registra');
        } else {
          this.dataEquipo[2].data[0].value = 'No registra';
          this.dataEquipo[2].data[1].value = 'No registra';
          this.dataEquipo[2].data[2].value = 'No registra';
        }

        if (this.equipo.macs.length > 0) {
          this.dataEquipo[3].data = [];
          for (let i = 0; i < this.equipo.macs.length; i ++) {
            this.dataEquipo[3].data.push({ titulo: this.equipo.macs[i].tipo, value: this.equipo.macs[i].mac });
          }
        } else {
          this.dataEquipo[3].data[0].titulo = 'Dirección MAC LAN:';
          this.dataEquipo[3].data[1].titulo = 'Dirección MAC WIFI:';
          this.dataEquipo[3].data[0].value = 'No registra';
          this.dataEquipo[3].data[1].value = 'No registra';
        }

        this.showOpciones = true;
        this.opciones[1].show = (this.$auth.user.rol === 'COORDINADOR' ? true : false);
        this.opciones[2].show = true;
        this.opciones[3].show = true;
        this.opciones[4].show = (this.$auth.user.rol === 'COORDINADOR' ? true : false)
      }
    }
  }
</script>
<style>
  .head-card-style {
    background-color: #7BC142;
    color: white;
  }
</style>
