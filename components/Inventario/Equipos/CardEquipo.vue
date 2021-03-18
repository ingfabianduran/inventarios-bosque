<template>
  <v-card
    outlined
    elevation="4">
    <v-card-title
      class="font-weight-bold">
      Equipo PF02NDXJ
    </v-card-title>
    <v-card-subtitle>UBSCOB404-02</v-card-subtitle>
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
      <v-btn
        dark
        color="#F27830"
        class="mr-1">
        Agregar Equipo
      </v-btn>
      <v-menu
        offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            dark
            color="#7BC142"
            v-bind="attrs"
            v-on="on">
            Mas Información
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(opcion, i) in menuOpciones"
            :key="i"
            link>
            <v-list-item-title v-text="opcion.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>
<script>
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
            { titulo: 'Marca:', value: 'Lenovo' },
            { titulo: 'Modelo:', value: 'Lenovo L460' },
            { titulo: 'Procesador:', value: 'Intel Core i7-6500' },
            { titulo: 'Memoria RAM:', value: '16 GB' },
            { titulo: 'Disco Duro:', value: 'Lenovo' },
          ] },
          { titulo: 'Ubicación y Usuario', col: 3, data: [
            { titulo: 'Dependencia - Área:', value: 'Aulas informaticas' },
            { titulo: 'Ubicación:', value: 'A-404' },
            { titulo: 'Nombre del responsable:', value: 'Fabian Duran' },
            { titulo: 'Nombre de red:', value: 'UBSCOB404-02' },
            { titulo: 'Usuario de dominio:', value: 'Aula Informatica' },
          ] },
          { titulo: 'Placas y Seriales', col: 3, data: [
            { titulo: 'Numero interno:', value: '274581' },
            { titulo: 'Placa de inventario:', value: '300000029852' },
            { titulo: 'Serial:', value: 'PF02NDXJ' },
          ] },
          { titulo: 'Redes', col: 3, data: [
            { titulo: 'Dirección MAC LAN:', value: 'C8-5B-76-9D-57-76' },
            { titulo: 'Dirección MAC WIFI:', value: 'F0-D5-BF-44-E5-AD' },
          ] }
        ]
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
