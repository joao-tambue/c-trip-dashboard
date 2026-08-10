<script setup lang="ts">
import type { Estatistica, Horario, Rota } from '~/types'

const { data: rotas } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })
const { data: horarios } = await useFetch<Horario[]>('/api/publicador/horarios', { default: () => [] })

const estatisticas = computed<Estatistica[]>(() => {
  const rotasActivas = rotas.value.filter(r => r.activa).length
  const horariosValidos = horarios.value.filter(h => h.estado !== 'cancelado')
  const ocupacaoMedia = horariosValidos.length
    ? Math.round(horariosValidos.reduce((soma, h) => soma + (h.lugaresOcupados / h.lugaresTotais), 0) / horariosValidos.length * 100)
    : 0
  const receita30d = horariosValidos.reduce((soma, h) => soma + h.lugaresOcupados * h.precoBase, 0)

  return [{
    title: 'Rotas activas',
    icon: 'i-lucide-route',
    value: rotasActivas,
    variation: rotasActivas > 0 ? 1 : 0
  }, {
    title: 'Horários publicados',
    icon: 'i-lucide-calendar-clock',
    value: horarios.value.length,
    variation: inteiroAleatorio(0, 15)
  }, {
    title: 'Ocupação média',
    icon: 'i-lucide-armchair',
    value: `${ocupacaoMedia}%`,
    variation: ocupacaoMedia >= 60 ? 8 : -8
  }, {
    title: 'Receita gerada',
    icon: 'i-lucide-circle-dollar-sign',
    value: formatarMoedaAOA(receita30d),
    variation: inteiroAleatorio(-5, 20)
  }]
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in estatisticas"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs uppercase'
      }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>

        <UBadge
          :color="stat.variation > 0 ? 'success' : 'error'"
          variant="subtle"
          class="text-xs"
        >
          {{ stat.variation > 0 ? '+' : '' }}{{ stat.variation }}%
        </UBadge>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
