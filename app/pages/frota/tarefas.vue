<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { EstadoTarefa, PrioridadeTarefa, Tarefa } from '~/types'

useSeoMeta({
  title: 'Tarefas · Gestão de Frota'
})

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

const { data } = await useFetch<Tarefa[]>('/api/frota/tarefas', { default: () => [] })
const lista = ref<Tarefa[]>([])
watchEffect(() => {
  lista.value = data.value.map(tarefa => ({ ...tarefa }))
})

let proximoId = 100

function criarTarefa(dados: Omit<Tarefa, 'id' | 'estado'>) {
  lista.value.unshift({ id: proximoId++, estado: 'pendente', ...dados })
  toast.add({ title: 'Tarefa criada', description: `Atribuída a ${dados.atribuidoA}.`, color: 'success' })
}

function mudarEstado(tarefa: Tarefa, estado: EstadoTarefa) {
  tarefa.estado = estado
  toast.add({ title: 'Estado actualizado', description: `"${tarefa.titulo}" agora está ${estadoInfo[estado].label.toLowerCase()}.` })
}

const prioridadeInfo: Record<PrioridadeTarefa, { label: string, color: 'error' | 'warning' | 'neutral' }> = {
  alta: { label: 'Alta', color: 'error' },
  media: { label: 'Média', color: 'warning' },
  baixa: { label: 'Baixa', color: 'neutral' }
}

const estadoInfo: Record<EstadoTarefa, { label: string, color: 'neutral' | 'info' | 'success' }> = {
  pendente: { label: 'Pendente', color: 'neutral' },
  em_curso: { label: 'Em curso', color: 'info' },
  concluida: { label: 'Concluída', color: 'success' }
}

const colunas: TableColumn<Tarefa>[] = [
  {
    accessorKey: 'titulo',
    header: 'Tarefa',
    cell: ({ row }) => h('div', undefined, [
      h('p', { class: 'font-medium text-highlighted' }, row.original.titulo),
      h('p', { class: 'text-xs text-muted' }, row.original.descricao)
    ])
  },
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
    accessorKey: 'prazo',
    header: 'Prazo',
    cell: ({ row }) => formatarDataHora(row.original.prazo)
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
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' }, h(UDropdownMenu, {
      content: { align: 'end' },
      items: [
        { label: 'Marcar como pendente', icon: 'i-lucide-circle-dashed', disabled: row.original.estado === 'pendente', onSelect: () => mudarEstado(row.original, 'pendente') },
        { label: 'Marcar em curso', icon: 'i-lucide-loader-circle', disabled: row.original.estado === 'em_curso', onSelect: () => mudarEstado(row.original, 'em_curso') },
        { label: 'Marcar concluída', icon: 'i-lucide-check-circle-2', disabled: row.original.estado === 'concluida', onSelect: () => mudarEstado(row.original, 'concluida') }
      ]
    }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost' })))
  }
]
</script>

<template>
  <UDashboardPanel id="frota-tarefas">
    <template #header>
      <UDashboardNavbar title="Tarefas">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <TarefaFormModal @criar="criarTarefa" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UTable
        :data="lista"
        :columns="colunas"
        class="shrink-0"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default'
        }"
      />
    </template>
  </UDashboardPanel>
</template>
