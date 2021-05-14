<template>
  <v-card>
    <ValidationObserver
      ref="formRed">
      <v-form
        autocomplete="off"
        @submit.prevent="addMac">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:LAN,WAN">
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
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="mac"
                rules="required|max:20">
                <v-text-field
                  v-model="form.mac"
                  v-mask="' XX-XX-XX-XX-XX-XX'"
                  label="Mac"
                  placeholder="Mac del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="1">
              <v-btn
                type="submit"
                class="mx-2 text-center"
                fab
                dark
                outlined
                color="#7BC142">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            v-if="macs.length > 0">
            <v-col
              cols="12"
              md="12">
              <v-simple-table
                dense>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Mac</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(mac, i) in macs"
                    :key="i">
                    <td>{{ mac.tipo }}</td>
                    <td>{{ mac.mac }}</td>
                    <td>
                      <v-btn
                        icon
                        @click="deleteMac(i)">
                        <v-icon
                          color="#F27830">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions
          class="justify-end">
          <v-btn
            type="button"
            dark
            color="#F27830"
            @click="sendMacs()">
            Finalizar
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
  /**
    * @module components/Inventario/Redes/FormRed
  */
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Array} tipos - Tipos que puede tener una dirección mac.
   * @vue-data {Array} macs - Listado que almacena las mac registradas.
   * @vue-prop {Array} [redes=[]] - Listado de macs registradas sobre un equipo.
   * @vue-event {} addMac - Agrega una mac a la lista macs.
   * @vue-event {} deleteMac - Elimina la mac seleccionada en la lista.
   * @vue-event {} sendMacs - Envia la lista macs al componente padre.
   * @vue-event {} omitir - Emite el evento omitir al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
  */
  export default {
    data() {
      return {
        form: {
          tipo: '',
          mac: ''
        },
        tipos: ['LAN', 'WAN'],
        macs: []
      }
    },
    props: {
      redes: {
        type: Array,
        required: false
      }
    },
    methods: {
      async addMac() {
        const validate = await this.$refs.formRed.validate();
        if (validate) {
          this.macs.push({
            tipo: this.form.tipo,
            mac: this.form.mac
          });

          this.form.tipo = '';
          this.form.mac = '';
          this.$refs.formRed.reset();
        }
      },
      deleteMac(indice) {
        this.macs.splice(indice, 1);
      },
      sendMacs() {
        this.$emit('getMacs', this.macs);
      },
      omitir() {
        this.$emit('omitir');
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formRed.reset();
        this.form.tipo = '';
        this.form.mac = '';
        this.macs = [];
      }
    },
    /**
      * Watch Events:
      * @property {Function} redes - Setea los valores en la lista macs.
    */
    watch: {
      redes() {
        this.macs = this.redes;
      }
    }
  }
</script>
