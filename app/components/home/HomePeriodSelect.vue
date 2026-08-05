<script setup lang="ts">
import { eachDayOfInterval } from 'date-fns'
import type { Periodo, Intervalo } from '~/types'

const modelo = defineModel<Periodo>({ required: true })

const props = defineProps<{
  intervalo: Intervalo
}>()

const dias = computed(() => eachDayOfInterval(props.intervalo))

const periodos = computed<{ label: string, value: Periodo }[]>(() => {
  if (dias.value.length <= 8) {
    return [
      { label: 'Diário', value: 'diario' }
    ]
  }

  if (dias.value.length <= 31) {
    return [
      { label: 'Diário', value: 'diario' },
      { label: 'Semanal', value: 'semanal' }
    ]
  }

  return [
    { label: 'Semanal', value: 'semanal' },
    { label: 'Mensal', value: 'mensal' }
  ]
})

// Garante que o valor do modelo seja sempre um período válido
watch(periodos, () => {
  if (!periodos.value.some(p => p.value === modelo.value)) {
    modelo.value = periodos.value[0]!.value
  }
})
</script>

<template>
  <USelect
    v-model="modelo"
    :items="periodos"
    variant="ghost"
    class="data-[state=open]:bg-elevated"
    :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
  />
</template>
