<template>
  <v-card>
    <ValidationObserver
      ref="formEspacio">
      <v-form>
        <v-card-title>{{ this.titulo }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col 
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:5|max:45">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre del Espacio"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col 
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="edificio_id"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.edificio_id"
                  :items="edificios"
                  item-text="nombre"
                  item-value="id"
                  label="Edificio"
                  outlined
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions 
          class="justify-end">
          <v-btn
            type="submit"
            dark
            color="#F27830">
            {{ this.textBtn }}
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142"
            @click="clearForm()">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        edificios: [],
        form: {
          nombre: '',
          edificio_id: ''
        }
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      espacio: {
        type: Object,
      },
      textBtn: {
        type: String,
        required: true
      },
    },
    async created() {
      await this.getEdificios();
    },
    methods: {
      async getEdificios() {
        this.edificios = await this.$axios.$get('api/asignacion/edificios/i/10/1');
      },
      clearForm() {
        this.$refs.formEspacio.reset();
        this.$emit('clearForm');
      }
    },
    watch: {
      titulo() {
        this.form.nombre = this.espacio.nombre;
        this.form.edificio_id = this.espacio.edificio_id;
      }
    }
  }
</script>