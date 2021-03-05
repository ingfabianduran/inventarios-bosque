<template>
  <v-card>
    <Loader :isShow="isLoading" color="#212121" size="90" />
    <ValidationObserver
      ref="formAsignacion">
      <v-form
        @submit.prevent="storeAsignacion">
        <v-card-title>{{ this.titulo }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Aulas,Oficinas">
                <v-select
                  v-model="form.tipo"
                  label="Tipo"
                  outlined
                  :items="tipos"
                  :error-messages="errors">
                </v-select>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="responsable_id"
                rules="required">
                <v-autocomplete
                  v-model="form.responsable_id"
                  label="Responsable"
                  :items="responsables"
                  outlined
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="1">
              <v-checkbox
                v-model="form.estado"
                label="Estado"
                color="#F27830">
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="edificio"
                rules="required">
                <v-autocomplete
                  v-model="edificio"
                  label="Edificio"
                  :items="edificios"
                  outlined
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="espacio_id"
                rules="required">
                <v-autocomplete
                  v-model="form.espacio_id"
                  label="Espacio"
                  :items="espacios"
                  outlined
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="equipo_id"
                rules="required">
                <v-autocomplete
                  v-model="form.equipo_id"
                  label="Equipo"
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
            @click="clearForm">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>
<script>
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';

  export default {
    data() {
      return {
        tipos: ['Aulas', 'Oficinas'],
        responsables: [],
        edificios: [],
        espacios: [],
        equipos: [],
        form: {
          tipo: '',
          estado: false,
          responsable_id: '',
          espacio_id: '',
          equipo_id: ''
        },
        edificio: '',
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      asignacion: {
        type: Object,
        required: false
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
    components: {
      Loader
    },
    methods: {
      storeAsignacion() {
        Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const { descripcion } = (this.titulo === 'Nueva Asignación') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.clearForm();
              }, 500);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      clearForm() {
        this.form.tipo = '';
        this.form.estado = false;
        this.form.responsable_id = '';
        this.form.espacio_id = '';
        this.form.equipo_id = '';
        this.$emit('clearForm');
      }
    },
    watch: {
      asignacion() {
        this.form.tipo = this.asignacion.tipo;
        this.form.estado = this.asignacion.estado;
        this.form.responsable_id = this.asignacion.responsable_id;
        this.form.espacio_id = this.asignacion.espacio_id;
        this.form.equipo_id = this.asignacion.equipo_id;
      }
    }
  }
</script>