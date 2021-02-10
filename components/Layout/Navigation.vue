<template>
  <v-navigation-drawer
    v-model="isView"
    app
    dark
    color="#3C4024">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Fabian Duran Avellaneda</v-list-item-title>
          <v-list-item-subtitle>Coordinador</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="i in 8"
        :key="i"
        link>
          <v-list-item-icon>
            <v-icon>mdi-desktop-classic</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ `Link ${ i + 1 }` }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    props: {
      isView: Boolean
    }
  }
</script>