<template>
  <v-navigation-drawer
    v-model="navigation.isView"
    app
    dark
    color="#404827"
    width="280"
    class="mx-auto">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-avatar
            color="#F27830"
            size="56">
            <span>{{ avatar }}</span>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.nombre }} {{ user.apellido }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.rol }}</v-list-item-subtitle>
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
  /**
    * Site Navigation component
    * @vuedoc
    * @exports components/Layout/Navigation
  */
  export default {
    data() {
      return {
        asignaciones: [
          { titulo: 'Infraestructura', icon: 'mdi-home-modern', roles:['COORDINADOR'], subtitulos: [
            { titulo: 'Bloques', link: '/asignaciones/edificios', roles:['COORDINADOR'] },
            { titulo: 'Dependencias', link: '/asignaciones/dependencias', roles:['COORDINADOR'] },
            { titulo: 'Espacios', link: '/asignaciones/espacios', roles:['COORDINADOR'] },
          ] },
          { titulo: 'Responsables', icon: 'mdi-account-group', link: '/asignaciones/responsables', roles:['COORDINADOR'] },
          { titulo: 'Asignaciones', icon: 'mdi-handshake', link: '/asignaciones/asignaciones', roles:['COORDINADOR'] },
        ],
        mantenimientos: [
          { titulo: 'Servicio Tecnico', icon: 'mdi-hammer-wrench', link: '#', roles:['COORDINADOR', 'SOPORTE', 'MESA'], subtitulos: [
            { titulo: 'Categorias', link: '/mantenimientos/categorias', roles:['COORDINADOR'] },
            { titulo: 'Usuarios', link: '/mantenimientos/especialistas', roles:['COORDINADOR'] },
            { titulo: 'Mantenimientos', link: '/mantenimientos/mantenimientos', roles:['COORDINADOR', 'SOPORTE', 'MESA'] }
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
          { titulo: 'Pantallas', icon: 'mdi-monitor', link: '/inventarios/pantallas', roles:['COORDINADOR'] },
        ]
      }
    },
    props: {
      navigation: {
        type: Object,
        required: true
      }
    },
    components: {
      ListNavigation
    },
    methods: {
      closeSesion() {
        Alert.showConfirm('Cerrar Sesión', 'Esta seguro de salir de la aplicación', 'question', (confirmed) => {
          if (confirmed) {
            try {
              Alert.showToast('success', 'Esta a punto de salir del sistema...');
              setTimeout(async () => {
                this.$store.commit('setConfig', {});
                await this.$auth.logout();
                this.$router.push('/');
              }, 3000);
            }
            catch (error) {

            }
          }
        });
      }
    },
    computed: {
      user() {
        return this.$auth.user;
      },
      avatar() {
        try {
          return `${this.$auth.user.nombre.charAt(0)}${this.$auth.user.apellido.charAt(0)}`;
        } catch (error) {

        }
      }
    },
  }
</script>
