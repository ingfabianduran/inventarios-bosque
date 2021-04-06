<template>
  <v-card flat>
    <v-card-text>
      <div
        v-for="(item, i) in data"
        :key="i">
        <ValidationObserver
          ref="formUpdateSoftware">
          <v-form>
            <v-row>
              <v-col
                cols="12"
                md="10">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="pantalla"
                  rules="required|integer">
                  <v-autocomplete
                    v-model="item.id"
                    label="Nombre"
                    :items="items"
                    item-text="nombre"
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
                md="2"
                class="text-center">
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
        ref="formAddSoftware">
        <v-form>
          <v-row>
            <v-col
              cols="12"
              md="10">
              <ValidationProvider
                v-slot="{ errors }"
                name="pantalla"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.software_id"
                  label="Nombre"
                  :items="items"
                  item-text="nombre"
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
          software_id: ''
        },
        items: []
      }
    },
    props: {
      data: {
        type: Array,
        required: true
      },
    },
    async fetch() {
      const { data } = await this.$axios.$get('api/inventario/softwares/i/0');
      this.items = data;
    },
    methods: {
      async addSoftware() {

      },
      async updateSoftware() {

      },
      async deleteSoftware() {

      }
    }
  }
</script>
