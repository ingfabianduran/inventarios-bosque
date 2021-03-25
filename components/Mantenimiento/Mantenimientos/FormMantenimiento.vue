<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="100" />
    <ValidationObserver
      ref="formMantenimiento">
      <v-form
        @submit.prevent="storeMantenimiento">
        <v-card-title class="font-weight-bold">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Correctivo,Preventivo">
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
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="especialista"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.user_id"
                  label="Especialista"
                  :items="especialistas"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="categoria"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.categoria_id"
                  label="Categoria"
                  :items="categorias"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="equipo"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.equipo_id"
                  label="Equipo"
                  :items="equipos"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="tarea realizada"
                rules="required|max:2000">
                <v-textarea
                  v-model="form.tarea_realizada"
                  outlined
                  label="Tareas realizada"
                  auto-grow
                  color="#7BC142"
                  :error-messages="errors">
                </v-textarea>
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
  import Loader from '~/components/Site/Loader';
  import Alert from '~/components/Site/SweetAlert';

  export default {
    data() {
      return {
        tipos: ['Correctivo', 'Preventivo'],
        especialistas: [],
        categorias: [],
        equipos: [],
        form: {
          tipo: '',
          tarea_realizada: '',
          user_id: '',
          categoria_id: '',
          equipo_id: ''
        },
        isLoading: false,
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      mantenimiento: {
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
    async fetch() {
      await this.getEspecialistas();
      await this.getCategorias();
    },
    methods: {
      async getEspecialistas() {
        const { data } = await this.$axios.$get('api/mantenimiento/users/i/0');
        this.especialistas = data;
      },
      async getCategorias() {
        const { data } = await this.$axios.$get('api/mantenimiento/categorias/i/0');
        this.categorias = data;
      },
      async storeMantenimiento() {
        const validate = await this.$refs.formMantenimiento.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Nuevo Mantenimiento') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
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
      clearForm() {
        this.$refs.formMantenimiento.reset();
        this.form.tipo = '';
        this.form.tarea_realizada = '';
        this.form.user_id = '';
        this.form.categoria_id = '';
        this.form.equipo_id = '';
        this.$emit('clearForm');
      },
    },
    watch: {
      mantenimiento() {
        this.form.tipo = this.mantenimiento.tipo;
        this.form.tarea_realizada = this.mantenimiento.tarea_realizada;
        this.form.user_id = this.mantenimiento.user_id;
        this.form.categoria_id = this.mantenimiento.categoria_id;
        this.form.equipo_id = this.mantenimiento.equipo_id;
      },
    }
  }
</script>
