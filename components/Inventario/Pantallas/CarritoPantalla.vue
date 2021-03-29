<template>
  <v-card flat>
    <v-card-text>
      <div
        v-for="(item, i) in data"
        :key="i">
        <v-row>
          <v-col
            cols="12"
            md="5">
            <v-autocomplete
              v-model="item.pivot.pantalla_id"
              label="Pantalla"
              :items="items"
              :item-text="item => `${item.marca.nombre} - ${item.pulgadas}`"
              item-value="id"
              dense
              outlined
              color="#7BC142">
            </v-autocomplete>
          </v-col>
          <v-col
            cols="12"
            md="5"
            class="text-center">
            <v-text-field
              v-model="item.pivot.serial"
              label="Serial"
              placeholder="Serial de la pantalla"
              outlined
              dense
              color="#7BC142">
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="2">
            <v-btn
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
      </div>
      <v-row>
        <v-col
          cols="12"
          md="5">
          <v-autocomplete
            label="Pantalla"
            :items="items"
            :item-text="item => `${item.marca.nombre} - ${item.pulgadas}`"
            item-value="id"
            dense
            outlined
            color="#7BC142">
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="5">
          <v-text-field
            label="Serial"
            placeholder="Serial de la pantalla"
            outlined
            dense
            color="#7BC142">
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="2"
          class="text-center">
          <v-btn
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
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
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
    }
  }
</script>
