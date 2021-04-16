<template>
  <div>
    <v-subheader>{{ categoria }}</v-subheader>
    <v-list
      v-for="(link, i) in links"
      :key="i"
      rounded
      :disabled="!validateRoles(link.roles)">
      <template v-if="link.subtitulos">
        <v-list-group
          :prepend-icon="link.icon"
          no-action
          color="#FAFAFA">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="link.titulo"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(subLink, j) in link.subtitulos"
            :key="j"
            link
            :inactive="true"
            :disabled="!validateRoles(subLink.roles)">
            <v-list-item-content>
              <nuxt-link :to="subLink.link" class="link">
                <v-list-item-title class="text-link" v-text="subLink.titulo"></v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-else>
        <nuxt-link :to="link.link" class="link">
          <v-list-item
            link
            :disabled="!validateRoles(link.roles)">
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                v-text="link.titulo"
                class="text-link">
              </v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </template>
    </v-list>
  </div>
</template>
<script>
  export default {
    props: {
      categoria: String,
      links: Array
    },
    methods: {
      validateRoles(roles) {
        return roles.includes(this.$auth.user.rol);
      }
    },
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
