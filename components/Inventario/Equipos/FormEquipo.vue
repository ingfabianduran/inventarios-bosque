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
          color="#7BC142">
          {{ step.titulo }}
          <small v-if="step.opcional">Opcional</small>
        </v-stepper-step>
        <v-divider
          v-if="i !== 5"
          :key="i">
        </v-divider>
      </template>
    </v-stepper-header>
  </v-stepper>
</template>
<script>
  export default {
    data() {
      return {
        isView: false,
        paso: 1,
        pasos: [
          { titulo: 'Disco Duro', step: 1, opcional: true },
          { titulo: 'Memoria Ram', step: 2, opcional: true },
          { titulo: 'Información', step: 3, opcional: false },
          { titulo: 'Inventario', step: 4, opcional: false },
          { titulo: 'Caracteristicas', step: 5, opcional: false },
          { titulo: 'Redes', step: 6, opcional: false },
        ]
      }
    }
  }
</script>
