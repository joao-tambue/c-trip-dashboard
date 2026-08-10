<script setup lang="ts">
import type { Empresa, Estatistica, Reembolso } from '~/types'

const { data: empresasData } = await useFetch<Empresa[]>('/api/admin/empresas', { default: () => [] })
const { data: reembolsosData } = await useFetch<Reembolso[]>('/api/admin/reembolsos', { default: () => [] })

const { data: estatisticas } = await useAsyncData<Estatistica[]>('admin-estatisticas', async () => {
  const empresasActivas = empresasData.value.filter(empresa => empresa.estado === 'verificada').length
  const receitaPlataforma = empresasData.value.reduce((total, empresa) => total + empresa.vendas30d, 0)
  const reembolsosPendentes = reembolsosData.value.filter(reembolso => reembolso.estado === 'pendente').length

  return [{
    title: 'Empresas activas',
    icon: 'i-lucide-building-2',
    value: empresasActivas,
    variation: inteiroAleatorio(0, 12)
  }, {
    title: 'Reservas (30 dias)',
    icon: 'i-lucide-ticket',
    value: inteiroAleatorio(9200, 12400),
    variation: inteiroAleatorio(-4, 22)
  }, {
    title: 'Receita da plataforma',
    icon: 'i-lucide-circle-dollar-sign',
    value: formatarMoedaAOA(receitaPlataforma),
    variation: inteiroAleatorio(-6, 18)
  }, {
    title: 'Reembolsos pendentes',
    icon: 'i-lucide-receipt-text',
    value: reembolsosPendentes,
    variation: inteiroAleatorio(-30, 10)
  }]
}, {
  default: () => []
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
