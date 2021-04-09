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
          <v-list-item-title>{{ `${user.nombre} ${user.apellido}` }}</v-list-item-title>
          <v-list-item-subtitle>{{ `${user.rol}` }}</v-list-item-subtitle>
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
          rounded
          @click="closeSesion()">
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
  import Alert from '~/components/Site/SweetAlert';

  export default {
    data() {
      return {
        asignaciones: [
          { titulo: 'Infraestructura', icon: 'mdi-home-modern', roles:['COORDINADOR'], subtitulos: [
            { titulo: 'Edificios', link: '/asignaciones/edificios', roles:['COORDINADOR'] },
            { titulo: 'Dependencias', link: '/asignaciones/dependencias', roles:['COORDINADOR'] },
            { titulo: 'Espacios', link: '/asignaciones/espacios', roles:['COORDINADOR'] },
          ] },
          { titulo: 'Responsables', icon: 'mdi-account-group', link: '/asignaciones/responsables', roles:['COORDINADOR'] },
          { titulo: 'Asignaciones', icon: 'mdi-handshake', link: '/asignaciones/asignaciones', roles:['COORDINADOR'] },
        ],
        mantenimientos: [
          { titulo: 'Servicio Tecnico', icon: 'mdi-hammer-wrench', link: '#', roles:['COORDINADOR', 'SOPORTE'], subtitulos: [
            { titulo: 'Categorias', link: '/mantenimientos/categorias', roles:['COORDINADOR'] },
            { titulo: 'Especialistas', link: '/mantenimientos/especialistas', roles:['COORDINADOR'] },
            { titulo: 'Mantenimientos', link: '/mantenimientos/mantenimientos', roles:['COORDINADOR', 'SOPORTE'] }
          ] },
        ],
        inventario: [
          { titulo: 'Inventarios', icon: 'mdi-desktop-classic', link: '#', roles:['COORDINADOR', 'SOPORTE', 'MESA'], subtitulos: [
            { titulo: 'Equipos', link: '/inventarios/equipos', roles:['COORDINADOR', 'SOPORTE', 'MESA'] },
            { titulo: 'Modelos', link: '/inventarios/modelos', roles:['COORDINADOR'] },
          ] },
          { titulo: 'Software', icon: 'mdi-blender-software', link: '#', roles:['COORDINADOR'], subtitulos: [
            { titulo: 'Sistemas Operativos', link: '/inventarios/sistemas', roles:['COORDINADOR'] },
            { titulo: 'Software', link: '/inventarios/softwares', roles:['COORDINADOR'] },
          ] },
          { titulo: 'Monitores', icon: 'mdi-monitor', link: '/inventarios/pantallas', roles:['COORDINADOR'] },
        ]
      }
    },
    props: {
      navigation: Object,
    },
    components: {
      ListNavigation
    },
    methods: {
      async closeSesion() {
        Alert.showConfirm('Cerrar Sesión', 'Esta seguro de salir de la aplicación', 'question', async(confirmed) => {
          if (confirmed) {
            await this.$auth.logout();
            location.href = '/';
          }
        });
      }
    },
    computed: {
      user() {
        return this.$auth.user;
      }
    },
  }
</script>
