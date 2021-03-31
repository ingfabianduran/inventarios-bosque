<template>
  <div>
    <Equipo
      :dialog="dialog"
      @closeModal="closeModal"
      v-if="dialog.isView" />
    <v-card>
      <v-card-title
        class="font-weight-bold">
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
              tile>
              <v-card-title
                class="subheading font-weight-bold head-card-style">
                {{ equipo.titulo }}
              </v-card-title>
              <v-list
                dense>
                <v-list-item
                  v-for="(data, j) in equipo.data"
                  :key="j">
                  <v-list-item-content>{{ data.titulo }}</v-list-item-content>
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
          origin="center center"
          transition="scale-transition">
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
        menuOpciones: [
          { text: 'Mantenimientos' },
          { text: 'Monitores' },
          { text: 'Observaciones' },
          { text: 'Perifericos' },
          { text: 'Software' },
        ],
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
            { titulo: 'Dirección MAC LAN:', value: 'No consultado' },
            { titulo: 'Dirección MAC WIFI:', value: 'No consultado' },
          ] },
        ],
        opciones: [
          { text: 'Agregar Equipo', opcion: 'agregarEquipo' },
          { text: 'Hoja de Vida', opcion: 'hojaVida' },
          { text: 'Mas Información', opcion: 'masInformacion' },
          { text: 'Modificar Equipo', opcion: 'modificarEquipo' }
        ],
        dialog: {
          isView: false,
          data: {}
        }
      }
    },
    props: {
      equipo: {
        type: Object,
        required: true
      }
    },
    components: {
      Equipo
    },
    methods: {
      closeModal(value) {
        this.dialog.isView = value;
      },
      eventMasOpciones(opcion) {
        if (opcion === 'agregarEquipo') {
          this.$emit('addEquipo');
        } else if (opcion === 'hojaVida') {
          Pdf.getHojaVida(this.equipo);
        } else if (opcion === 'masInformacion') {
          this.dialog.data = this.equipo;
          this.dialog.isView = true;
        }
      }
    },
    watch: {
      equipo() {
        this.dataEquipo[0].data[0].value = this.equipo.modelo.marca.nombre;
        this.dataEquipo[0].data[1].value = this.equipo.modelo.descripcion;
        this.dataEquipo[0].data[2].value = this.equipo.modelo.procesador.nombre;
        this.dataEquipo[0].data[3].value = this.equipo.memoria.capacidad;
        this.dataEquipo[0].data[4].value = this.equipo.disco.capacidad;

        if (this.equipo.asignaciones.length > 0) {
          this.dataEquipo[1].data[0].value = (this.equipo.asignaciones[0].responsable.dependencia.nombre ? this.equipo.asignaciones[0].responsable.dependencia.nombre : 'No registrar');
          this.dataEquipo[1].data[1].value = (this.equipo.asignaciones[0].espacio.nombre ? this.equipo.asignaciones[0].espacio.nombre : 'No registra');
          this.dataEquipo[1].data[2].value = (this.equipo.asignaciones[0].responsable.nombre ? this.equipo.asignaciones[0].responsable.nombre : 'No registra');
        } else {
          this.dataEquipo[1].data[0].value = 'No registra';
          this.dataEquipo[1].data[1].value = 'No registra';
          this.dataEquipo[1].data[2].value = 'No registra';
        }

        if (Object.keys(this.equipo.caracteristica).length !== 0) {
          this.dataEquipo[1].data[3].value = (this.equipo.caracteristica.nombre_red ? this.equipo.caracteristica.nombre_red : 'No registra');
          this.dataEquipo[1].data[4].value = (this.equipo.caracteristica.usuario_dominio ? this.equipo.caracteristica.usuario_dominio : 'No registra');
        } else {
           this.dataEquipo[1].data[3].value = 'No registra';
           this.dataEquipo[1].data[4].value = 'No registra';
        }

        if (Object.keys(this.equipo.inventario).length !== 0) {
          this.dataEquipo[2].data[0].value = (this.equipo.inventario.n_interno ? this.equipo.inventario.n_interno : 'No registra');
          this.dataEquipo[2].data[1].value = (this.equipo.inventario.inventario ? this.equipo.inventario.inventario : 'No registra');
          this.dataEquipo[2].data[2].value = (this.equipo.serie ? this.equipo.serie : 'No registra');
        } else {
          this.dataEquipo[2].data[0].value = 'No registra';
          this.dataEquipo[2].data[1].value = 'No registra';
          this.dataEquipo[2].data[2].value = 'No registra';
        }

        if (this.equipo.macs.length > 0) {
          this.dataEquipo[3].data[0].value = (this.equipo.macs[0].mac ? this.equipo.macs[0].mac : 'No registra');
          this.dataEquipo[3].data[1].value = (this.equipo.macs[1].mac ? this.equipo.macs[1].mac : 'No registra');
        } else {
          this.dataEquipo[3].data[0].value = 'No registra';
          this.dataEquipo[3].data[1].value = 'No registra';
        }
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
