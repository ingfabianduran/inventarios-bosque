<template>
  <v-navigation-drawer
    v-model="isView"
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
      categoria="Servicios" 
      :links="servicios" />
    <v-divider></v-divider>
    <ListNavigation 
      categoria="Tecnologia" 
      :links="tecnologias" />
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
        servicios: [
          { titulo: 'Infraestructura', icon: 'mdi-home-modern', subtitulos: [
            { titulo: 'Edificios', link: '/edificios' },
            { titulo: 'Dependencias', link: '/dependencias' },
            { titulo: 'Espacios', link: '/espacios' },
          ] },
          { titulo: 'Responsables', icon: 'mdi-account-group', link: '/responsables' },
          { titulo: 'Asignaciones', icon: 'mdi-handshake', link: '/asignaciones' },
          { titulo: 'Servicio Tecnico', icon: 'mdi-hammer-wrench', link: '#', subtitulos: [
            { titulo: 'Categorias', link: '#' },
            { titulo: 'Especialistas', link: '/especialistas' },
            { titulo: 'Mantenimientos', link: '#' }
          ] },
        ],
        tecnologias: [
          { titulo: 'Equipos', icon: 'mdi-desktop-classic', link: '#' },
          { titulo: 'Hardware', icon: 'mdi-harddisk', subtitulos: [
            { titulo: 'Discos Duros', link: '#' },
            { titulo: 'Memorias Ram', link: '#' },
            { titulo: 'Procesadores', link: '#' },
            { titulo: 'Pantallas', link: '#' },
          ] },
          { titulo: 'Software', icon: 'mdi-blender-software', subtitulos: [
            { titulo: 'Sistemas Operativos', link: '#' },
            { titulo: 'Programas', link: '#' },
          ] },
          { titulo: 'Redes', icon: 'mdi-ip-network', subtitulos: [
            { titulo: 'Direcciones Mac', link: '#' },
          ] },
        ]
      }
    },
    props: {
      isView: Boolean
    },
    components: {
      ListNavigation
    }
  }
</script>