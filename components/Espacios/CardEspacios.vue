<template>
  <v-card
    elevation="3"
    outlined>
    <v-card-title
      class="font-weight-bold">
      {{ `Espacio ${espacio.nombre}` }}
      <v-spacer></v-spacer>
      <v-chip
        color="#3C4024"
        dark
        label>
        <v-icon left>
          mdi-home-modern
        </v-icon>
        {{ `${espacio.edificio.nombre}` }}
      </v-chip>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="#7BC142"
        dark
        elevation="3"
        @click="getEspacio(espacio.id)">
        <v-icon left>
          mdi-pencil
        </v-icon>
        Ver y/o Actualizar
      </v-btn>
      <v-btn
        color="#F27830"
        dark
        elevation="3"
        @click="deleteEspacio(espacio.id)">
        <v-icon left>
          mdi-delete
        </v-icon>
        Eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: {
      espacio: Object
    },
    methods: {
      getEspacio(id) {

      },
      deleteEspacio(id) {

      }
    }
  }
</script>