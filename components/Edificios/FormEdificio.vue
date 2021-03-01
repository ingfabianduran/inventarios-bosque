<template>
  <v-card>
    <ValidationObserver
      ref="formEdificio">
      <v-form>
        <v-card-title>{{ this.titulo }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col 
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:5|max:45">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre del Bloque"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
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
        form: {
          nombre: ''
        },
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      edificio: {
        type: Object,
      },
      textBtn: {
        type: String,
        required: true
      },
    },
    methods: {
      clearForm() {
        this.$refs.formEdificio.reset();
        this.$emit('clearForm');
      }
    },
    watch: {
      titulo() {
        this.form.nombre = this.edificio.nombre;
      }
    }
  }
</script>