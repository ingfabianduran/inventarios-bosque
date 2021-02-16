<template>
  <div>
    <v-subheader>{{ categoria }}</v-subheader>
    <v-list
      v-for="(link, i) in links"
      :key="i"
      rounded>
      <template v-if="link.subtitulos">
        <v-list-group  
          :prepend-icon="link.icon"
          no-action
          color="#F27830">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="link.titulo"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(subLink, j) in link.subtitulos"
            :key="j"
            link>
            <v-list-item-content>
              <nuxt-link :to="subLink.link" class="link">
                <v-list-item-title class="text-link" v-text="subLink.titulo"></v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-else>
        <v-list-item
          link>
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title >{{ link.titulo }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
  export default {
    props: {
      categoria: String,
      links: Array
    }
  }
</script>
<style>
  .link {
    text-decoration: none;
  }
  .text-link {
    color: white;
  }
</style>