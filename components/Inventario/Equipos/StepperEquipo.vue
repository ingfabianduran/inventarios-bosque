<template>
  <v-stepper
    v-model="paso"
    alt-labels>
    <v-stepper-header>
      <template v-for="(step, i) in pasos">
        <v-stepper-step
          :key="`${i}-step`"
          :complete="paso > step.step"
          :step="step.step"
          color="#7BC142"
          editable>
          {{ step.titulo }}
          <small v-if="step.opcional">Opcional</small>
        </v-stepper-step>
        <v-divider
          v-if="i !== 5"
          :key="i">
        </v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content
        step="1">
        <Disco />
      </v-stepper-content>
      <v-stepper-content
        step="2">
        <Memoria />
      </v-stepper-content>
      <v-stepper-content
        step="3">
        <Equipo />
      </v-stepper-content>
      <v-stepper-content
        step="4">
        <Inventario />
      </v-stepper-content>
      <v-stepper-content
        step="5">
        <Caracteristica />
      </v-stepper-content>
      <v-stepper-content
        step="6">
        <Red />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  import Disco from '~/components/Inventario/Discos/FormDisco';
  import Memoria from '~/components/Inventario/Memorias/FormMemoria';
  import Equipo from '~/components/Inventario/Equipos/FormEquipo';
  import Inventario from '~/components/Inventario/Inventarios/FormInventario';
  import Caracteristica from '~/components/Inventario/Caracteristicas/FormCaracteristica';
  import Red from '~/components/Inventario/Redes/FormRed';

  export default {
    data() {
      return {
        paso: 1,
        pasos: [
          { titulo: 'Disco Duro', step: 1, opcional: true },
          { titulo: 'Memoria Ram', step: 2, opcional: true },
          { titulo: 'Equipo', step: 3, opcional: false },
          { titulo: 'Inventario', step: 4, opcional: true },
          { titulo: 'Caracteristicas', step: 5, opcional: true },
          { titulo: 'Redes', step: 6, opcional: true },
        ]
      }
    },
    components: {
      Disco,
      Memoria,
      Equipo,
      Inventario,
      Caracteristica,
      Red
    }
  }
</script>
