<template>
  <v-card
    elevation="3"
    outlined>
    <v-card-title
      class="font-weight-bold">
      {{ edificio.nombre }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="#7BC142"
        dark
        elevation="3"
        @click="getEdificio(edificio.id)">
        <v-icon left>
          mdi-pencil
        </v-icon>
        Ver y/o Actualizar
      </v-btn>
      <v-btn
        color="#F27830"
        dark
        elevation="3"
        @click="deleteEdificio(edificio.id)">
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
      edificio: Object
    }, 
    methods: {
      getEdificio(id) {
        
      },
      deleteEdificio(id) {
        
      }
    }
  }
</script>