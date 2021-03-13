<template>
  <v-card
    outlined>
    <v-card-title
      class="font-weight-bold">
      <div v-if="aranda">
        {{ `Caso No ${aranda.caso}` }}
      </div>
      <div v-else>
        No se registra caso en Aranda.
      </div>
    </v-card-title>
    <v-card-subtitle
      class="subtitle-2">
      <div v-if="aranda">
        {{ aranda.tipo }}
      </div>
    </v-card-subtitle>
    <v-card-actions
      class="justify-end">
        <v-btn
          text
          color="#F27830"
          v-if="!this.aranda.mantenimiento_id">
          Registrar
        </v-btn>
        <v-btn
          text
          color="#7BC142"
          v-if="this.aranda.mantenimiento_id">
          Actualizar
        </v-btn>
        <v-btn
          text
          color="#F27830"
          v-if="this.aranda.mantenimiento_id">
          Eliminar
        </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Alert from '~/components/Site/SweetAlert';

  export default {
    props: {
      aranda: {
        type: Object,
        default: {
          tipo: '',
          caso: ''
        }
      }
    }
  }
</script>
