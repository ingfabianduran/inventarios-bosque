<template>
  <v-card>
    <Loader :isShow="isLoading" size="60" />
    <ValidationObserver
      ref="formAsignacion">
      <v-form
        @submit.prevent="storeAsignacion">
        <v-card-title>{{ this.titulo }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
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
  import Loader from '~/components/Site/Loader';

  export default {
    data() {
      return {
        tipos: ['Aulas', 'Oficinas'],
        form: {
          tipo: '',
          estado: '',
          responsable_id: '',
          espacio_id: '',
          equipo_id: ''
        },
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
            this.isLoading = true;
            const { descripcion } = (this.titulo === 'Nuevo Especialista') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
            if (descripcion) {
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.clearForm();
              }, 500);
            }
          }
        });
      },
      clearForm() {
        
      }
    },
    watch: {
      especialista() {
        
      }
    }
  }
</script>