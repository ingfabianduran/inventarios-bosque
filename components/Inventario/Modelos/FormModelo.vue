<template>
  <v-card>
    <ValidationObserver
      ref="formModelo">
      <v-form>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:3|max:60">
                <v-text-field
                  label="Descripción"
                  placeholder="Descripción de la marca"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:All in One,Desktop,Portatil,Portatil Mini,Tablet,Tiny,WorkStation">
                <v-select
                  label="Tipo"
                  outlined
                  :items="tipos"
                  color="#7BC142"
                  :error-messages="errors">
                </v-select>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="2">
              <ValidationProvider
                v-slot="{ errors }"
                name="modulos de memoria"
                rules="integer">
                <v-text-field
                  label="Modulos"
                  placeholder="Modulos de memoria"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="marcas"
              cols="12"
              :md="(procesadores && marcas) ? 6 : 12">
              <ValidationProvider
                v-slot="{ errors }"
                name="marca"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.marca_id"
                  label="Marca"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              v-if="procesadores"
              cols="12"
              :md="(procesadores && marcas) ? 6 : 12">
              <ValidationProvider
                v-slot="{ errors }"
                name="procesador"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.procesador_id"
                  label="Procesador"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
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
            {{ textBtn }}
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
          descripcion: '',
          tipo: '',
          modulos_memoria: '',
          marca_id: '',
          procesador_id: '',
        },
        tipos: ['All in One', 'Desktop', 'Portatil', 'Portatil Mini', 'Tablet', 'Tiny,WorkStation']
      }
    },
    props: {
      marcas: {
        type: Boolean,
        default: false,
      },
      procesadores: {
        type: Boolean,
        default: false
      },
      textBtn: {
        type: String,
        default: 'Finalizar'
      }
    },
    methods: {
      async storeModelo() {
        const validate = await this.$refs.formModelo.validate();
        if (validate) {
          this.$emit('getModelo', this.form);
          this.$refs.formProcesador.reset();
          this.form.descripcion = '';
          this.form.tipo = '';
          this.form.modulos_memoria = '';
          this.form.marca_id = '';
          this.form.procesador_id = '';
        }
      },
      clearForm() {
        this.$refs.formModelo.reset();
        this.form.descripcion = '';
        this.form.tipo = '';
        this.form.modulos_memoria = '';
        this.form.marca_id = '';
        this.form.procesador_id = '';
        this.$emit('clearForm');
      }
    }
  }
</script>
