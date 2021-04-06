<template>
  <v-card flat>
    <v-card-text>
      <div
        v-for="(item, i) in data"
        :key="i">
        <ValidationObserver
          ref="formUpdatePantalla">
          <v-form>
            <v-row>
              <v-col
                cols="12"
                md="5">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="pantalla"
                  rules="required|integer">
                  <v-autocomplete
                    v-model="item.pivot.pantalla_id"
                    label="Pantalla"
                    :items="items"
                    :item-text="item => `${item.marca.nombre} - ${item.pulgadas}`"
                    item-value="id"
                    dense
                    outlined
                    color="#7BC142"
                    :error-messages="errors">
                  </v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col
                cols="12"
                md="5"
                class="text-center">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="serial"
                  rules="required|min:3|max:100">
                  <v-text-field
                    v-model="item.pivot.serial"
                    label="Serial"
                    placeholder="Serial de la pantalla"
                    outlined
                    dense
                    color="#7BC142"
                    :error-messages="errors">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col
                cols="12"
                md="2">
                <v-btn
                  type="submit"
                  elevation="2"
                  class="mr-1"
                  fab
                  dark
                  x-small
                  color="#7BC142">
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  type="button"
                  elevation="2"
                  fab
                  dark
                  x-small
                  color="#F27830">
                  <v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </div>
      <ValidationObserver
        ref="formAddPantalla">
        <v-form>
          <v-row>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="pantalla"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.pantalla_id"
                  label="Pantalla"
                  :items="items"
                  :item-text="item => `${item.marca.nombre} - ${item.pulgadas}`"
                  item-value="id"
                  dense
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="serial"
                rules="required|min:3|max:100">
                <v-text-field
                  v-model="form.serial"
                  label="Serial"
                  placeholder="Serial de la pantalla"
                  outlined
                  dense
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="2"
              class="text-center">
              <v-btn
                type="submit"
                elevation="2"
                class="mr-1"
                fab
                dark
                x-small
                color="#F27830">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          serial: '',
          pantalla_id: ''
        },
        items: []
      }
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    async fetch() {
      const { data } = await this.$axios.$get('api/inventario/pantallas/i/0');
      this.items = data;
    },
    methods: {
      async addPantalla() {

      },
      async updatePantalla() {

      },
      async deletePantalla() {

      }
    }
  }
</script>
