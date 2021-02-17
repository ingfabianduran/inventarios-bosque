<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-col>
        <ValidationProvider
          v-slot="{ errors }"
          name="busqueda"
          rules="required">
          <v-text-field
            v-model="busqueda"
            color="#7BC142"
            append-icon="mdi-magnify"
            label="Buscar"
            filled
            :error-messages="errors">
          </v-text-field>
        </ValidationProvider>
      </v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        busqueda: ''
      }
    },
    props: {
      title: String,
      headers: Array,
      items: Array
    },
  }
</script>