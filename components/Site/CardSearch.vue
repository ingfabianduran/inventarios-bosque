<template>
  <v-card
    outlined>
    <v-toolbar
      color="#404827"
      class="font-weight-bold text-h4"
      dark>
      Busqueda
    </v-toolbar>
    <v-form
      autocomplete="off">
      <v-card-text>
        <v-text-field
          v-model="busqueda"
          :label="nameBusqueda"
          filled
          rounded
          append-icon="mdi-magnify"
          color="#7BC142">
        </v-text-field>
      </v-card-text>
    </v-form>
    <v-card-actions
      class="justify-end">
      <v-btn
        type="submit"
        dark
        rounded
        color="#F27830"
        @click="resetBusqueda()">
        Reiniciar Busqueda
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  /**
   * @module components/Site/CardSearch
  */
  /**
    * @vue-data {String} busqueda - Cadena de texto que realiza la busqueda sobre la prop url.
    * @vue-prop {String} nameBusqueda - Texto ubicado en el label del v-text-field.
    * @vue-prop {String} url - Url que realiza una busqueda sobre la api.
    * @vue-event {} resetBusqueda - Setea la variable busqueda y emite un evento al componente padre.
  */
  export default {
    data() {
      return {
        busqueda: ''
      }
    },
    props: {
      nameBusqueda: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    methods: {
      resetBusqueda() {
        this.busqueda = '';
        this.$emit('resetBusqueda');
      }
    },
    /**
      * Watch Events:
      * @property {Function} busqueda - Realiza la busqueda sobre la url y envia la información al componente padre.
    */
    watch: {
      async busqueda(value) {
        if (value !== null && value.length > 0) {
          const { data } = await this.$axios.$get(`${this.url}${value}`);
          const pagination = {
            data: data,
            url: `${this.url}${value}?page=`
          };
          this.$emit('searchModel', pagination);
        }
      }
    }
  }
</script>
