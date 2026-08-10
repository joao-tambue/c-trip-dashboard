<script setup lang="ts">
import type { Autocarro, Estatistica, Motorista, Presenca, Tarefa } from '~/types'

const { data: autocarros } = await useFetch<Autocarro[]>('/api/frota/autocarros', { default: () => [] })
const { data: motoristas } = await useFetch<Motorista[]>('/api/frota/motoristas', { default: () => [] })
const { data: presencas } = await useFetch<Presenca[]>('/api/frota/presencas', { default: () => [] })
const { data: tarefas } = await useFetch<Tarefa[]>('/api/frota/tarefas', { default: () => [] })

const hoje = '2026-08-08'

const estatisticas = computed<Estatistica[]>(() => {
  const disponiveis = autocarros.value.filter(a => a.estado === 'disponivel').length
  const motoristasDisponiveis = motoristas.value.filter(m => m.disponibilidade === 'disponivel').length
  const presentesHoje = presencas.value.filter(p => p.data === hoje && p.estado !== 'ausente').length
  const totalHoje = presencas.value.filter(p => p.data === hoje).length
  const tarefasPendentes = tarefas.value.filter(t => t.estado !== 'concluida').length

  return [{
    title: 'Autocarros disponíveis',
    icon: 'i-lucide-bus',
    value: `${disponiveis}/${autocarros.value.length}`,
    variation: disponiveis === autocarros.value.length ? 0 : -1
  }, {
    title: 'Motoristas disponíveis',
    icon: 'i-lucide-id-card',
    value: motoristasDisponiveis,
    variation: motoristasDisponiveis > 0 ? 1 : -1
  }, {
    title: 'Presenças hoje',
    icon: 'i-lucide-calendar-check',
    value: totalHoje ? `${presentesHoje}/${totalHoje}` : '—',
    variation: totalHoje ? Math.round((presentesHoje / totalHoje) * 100) - 100 : 0
  }, {
    title: 'Tarefas pendentes',
    icon: 'i-lucide-clipboard-list',
    value: tarefasPendentes,
    variation: tarefasPendentes > 0 ? -1 : 1
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
      <span class="text-2xl font-semibold text-highlighted">
        {{ stat.value }}
      </span>
    </UPageCard>
  </UPageGrid>
</template>
