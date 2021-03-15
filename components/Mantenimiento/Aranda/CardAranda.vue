<template>
  <v-card>
    <ValidationObserver
      ref="formAranda">
      <v-form>
        <v-card-title
          class="font-weight-bold">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Incidente,Requerimiento">
                <v-select
                  v-model="form.tipo"
                  label="Tipo"
                  outlined
                  :items="tipos"
                  color="#7BC142"
                  :error-messages="errors">
                </v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="caso"
                rules="required|min:3|max:50">
                <v-text-field
                  v-model="form.caso"
                  label="Caso"
                  placeholder="Numero del caso"
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
            color="#7BC142">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>
<script>
  import Alert from '~/components/Site/SweetAlert';

  export default {
    data() {
      return {
        form: {
          tipo: '',
          caso: ''
        },
        tipos: ['Incidente', 'Requerimiento']
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      aranda: {
        type: Object,
        required: false
      },
      mantenimiento: {
        type: Object,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      textBtn: {
        type: String,
        required: true
      },
    },
  }
</script>
