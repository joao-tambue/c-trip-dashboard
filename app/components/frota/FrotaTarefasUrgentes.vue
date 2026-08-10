<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Tarefa } from '~/types'

const UBadge = resolveComponent('UBadge')

const { data } = await useFetch<Tarefa[]>('/api/frota/tarefas', { default: () => [] })

const prioridadeOrdem = { alta: 0, media: 1, baixa: 2 }

const urgentes = computed(() => data.value
  .filter(tarefa => tarefa.estado !== 'concluida')
  .sort((a, b) => prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade])
  .slice(0, 6))

const prioridadeInfo = {
  alta: { label: 'Alta', color: 'error' as const },
  media: { label: 'Média', color: 'warning' as const },
  baixa: { label: 'Baixa', color: 'neutral' as const }
}

const estadoInfo = {
  pendente: { label: 'Pendente', color: 'neutral' as const },
  em_curso: { label: 'Em curso', color: 'info' as const },
  concluida: { label: 'Concluída', color: 'success' as const }
}

const colunas: TableColumn<Tarefa>[] = [
  { accessorKey: 'titulo', header: 'Tarefa' },
  { accessorKey: 'atribuidoA', header: 'Atribuída a' },
  {
    accessorKey: 'prioridade',
    header: 'Prioridade',
    cell: ({ row }) => {
      const info = prioridadeInfo[row.original.prioridade]
      return h(UBadge, { variant: 'subtle', color: info.color }, () => info.label)
    }
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const info = estadoInfo[row.original.estado]
      return h(UBadge, { variant: 'subtle', color: info.color }, () => info.label)
    }
  },
  {
    accessorKey: 'prazo',
    header: 'Prazo',
    cell: ({ row }) => formatarDataHora(row.original.prazo)
  }
]
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <div class="flex items-center justify-between">
        <p class="font-semibold text-highlighted">
          Tarefas urgentes
        </p>
        <UButton
          to="/frota/tarefas"
          label="Ver todas"
          color="neutral"
          variant="link"
          size="sm"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </template>

    <UTable
      :data="urgentes"
      :columns="colunas"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        td: 'border-b border-default'
      }"
    />
  </UCard>
</template>
