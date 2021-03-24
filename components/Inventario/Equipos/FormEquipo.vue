<template>
  <v-card>
    <ValidationObserver
      ref="formEquipo">
      <v-form>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="compra"
                rules="required">
                <v-text-field
                  label="Compra"
                  placeholder="Fecha de la compra del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="garantia"
                rules="required">
                <v-text-field
                  label="Garatia"
                  placeholder="Fecha de la garantia del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Compra,Leasing">
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
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="serie"
                rules="required|min:3|max:100">
                <v-text-field
                  label="Serie"
                  placeholder="Serie del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="valor"
                rules="required|integer">
                <v-text-field
                  label="Valor"
                  placeholder="Valor del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="modelo"
                rules="required|integer">
                <v-autocomplete
                  label="Modelo"
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
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="disco"
                rules="required|integer">
                <v-autocomplete
                  label="Disco Duro"
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
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="memoria"
                rules="required|integer">
                <v-autocomplete
                  label="Memoria Ram"
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
            Siguiente
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
  export default {
    data() {
      return {
        tipos: ['Compra', 'Leasing']
      }
    }
  }
</script>
