<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="60" />
    <ValidationObserver
      ref="formAranda">
      <v-form
        autocomplete="off"
        @submit.prevent="storeAranda">
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
            color="#F27830"
            :disabled="stateBtn">
            {{ this.textBtn }}
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142"
            @click="clearForm()">
            Cancelar
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142"
            @click="deleteCasoAranda()"
            v-if="aranda.hasOwnProperty('id') && this.$auth.user.rol === 'COORDINADOR'">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>
<script>
  import Loader from '~/components/Site/Loader';
  import Alert from '~/components/Site/SweetAlert';

  export default {
    data() {
      return {
        form: {
          tipo: '',
          caso: '',
          mantenimiento_id: ''
        },
        tipos: ['Incidente', 'Requerimiento'],
        isLoading: false
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
      url: {
        type: String,
        required: true
      },
      textBtn: {
        type: String,
        required: true
      },
      stateBtn: {
        type: Boolean,
        default: false
      },
      mantenimiento: {
        type: Number,
        required: true
      }
    },
    components: {
      Loader
    },
    methods: {
      async storeAranda() {
        const validate = await this.$refs.formAranda.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Registrar Caso Aranda') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
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
        }
      },
      deleteCasoAranda() {
        Alert.showConfirm('Eliminar Registro', '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const { descripcion } = await this.$axios.$delete(`${this.url}`);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.clearForm();
              },1000);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      clearForm() {
        this.$refs.formAranda.reset();
        this.form.tipo = '';
        this.form.caso = '';
        this.form.mantenimiento_id = 0;
        this.$emit('clearForm');
      }
    },
    watch: {
      aranda() {
        if (this.aranda !== null) {
          this.form.tipo = this.aranda.tipo;
          this.form.caso =  this.aranda.caso;
          this.form.mantenimiento_id = this.mantenimiento;
        } else {
          this.form.tipo = '';
          this.form.caso = '';
          this.form.mantenimiento_id = this.mantenimiento;
        }
      }
    }
  }
</script>
