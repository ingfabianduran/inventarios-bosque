<template>
  <v-navigation-drawer
    v-model="navigation.isView"
    app
    dark
    color="#3C4024"
    width="280"
    class="mx-auto">
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
    <ListNavigation
      categoria="Asignación"
      :links="asignaciones" />
    <v-divider></v-divider>
    <ListNavigation
      categoria="Inventario"
      :links="inventario" />
    <v-divider></v-divider>
    <ListNavigation
      categoria="Mantenimientos"
      :links="mantenimientos" />
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          color="#F27830"
          rounded>
          <v-icon left>
            mdi-exit-to-app
          </v-icon>
          Salir
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
  import ListNavigation from '~/components/Layout/ListNavigation';

  export default {
    data() {
      return {
        asignaciones: [
          { titulo: 'Infraestructura', icon: 'mdi-home-modern', subtitulos: [
            { titulo: 'Edificios', link: '/asignaciones/edificios' },
            { titulo: 'Dependencias', link: '/asignaciones/dependencias' },
            { titulo: 'Espacios', link: '/asignaciones/espacios' },
          ] },
          { titulo: 'Responsables', icon: 'mdi-account-group', link: '/asignaciones/responsables' },
          { titulo: 'Asignaciones', icon: 'mdi-handshake', link: '/asignaciones/asignaciones' },
        ],
        mantenimientos: [
          { titulo: 'Servicio Tecnico', icon: 'mdi-hammer-wrench', link: '#', subtitulos: [
            { titulo: 'Categorias', link: '/mantenimientos/categorias' },
            { titulo: 'Especialistas', link: '/mantenimientos/especialistas' },
            { titulo: 'Mantenimientos', link: '/mantenimientos/mantenimientos' }
          ] },
        ],
        inventario: [
          { titulo: 'Inventarios', icon: 'mdi-desktop-classic', link: '#', subtitulos: [
            { titulo: 'Equipos', link: '/inventarios/equipos' },
            { titulo: 'Modelos', link: '/inventarios/modelos' },
          ] },
          { titulo: 'Software', icon: 'mdi-blender-software', link: '#', subtitulos: [
            { titulo: 'Sistemas Operativos', link: '/inventarios/sistemas' },
            { titulo: 'Software', link: '/inventarios/softwares' },
          ] },
          { titulo: 'Monitores', icon: 'mdi-monitor', link: '#' },
        ]
      }
    },
    props: {
      navigation: Object,
    },
    components: {
      ListNavigation
    }
  }
</script>
