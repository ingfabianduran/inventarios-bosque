<template>
  <v-card flat>
    <v-card-text>
      <div
        v-for="(item, i) in data"
        :key="i">
        <v-row>
          <v-col
            cols="12"
            md="10">
            <v-autocomplete
              v-model="item.id"
              :label="label"
              :items="items"
              item-text="nombre"
              item-value="id"
              dense
              outlined>
            </v-autocomplete>
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
      <v-divider></v-divider>
      <v-list
        dense>
        <v-subheader>NUEVA INSTALACIÓN</v-subheader>
      </v-list>
      <v-row>
        <v-col
          cols="12"
          md="10">
          <v-autocomplete
            :label="label"
            :items="items"
            item-text="nombre"
            item-value="id"
            dense
            outlined>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="2"
          class="text-center">
          <v-btn
            elevation="2"
            class="mr-1 text-center"
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
      url: {
        type: String,
        required: true
      },
      data: {
        type: Array,
        required: true
      },
      label: {
        type: String,
        required: true
      },
    },
    async fetch() {
      const { data } = await this.$axios.$get(this.url);
      this.items = data;
    },
  }
</script>
