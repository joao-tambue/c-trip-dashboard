<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { EstadoPresenca, Presenca } from '~/types'

useSeoMeta({
  title: 'Presenças · Gestão de Frota'
})

const UBadge = resolveComponent('UBadge')

const { data } = await useFetch<Presenca[]>('/api/frota/presencas', { default: () => [] })

const filtroDepartamento = ref('todos')
const busca = ref('')

const departamentos = computed(() => Array.from(new Set(data.value.map(p => p.departamento))))

const listaFiltrada = computed(() => data.value
  .filter(p => filtroDepartamento.value === 'todos' || p.departamento === filtroDepartamento.value)
  .filter(p => p.funcionarioNome.toLowerCase().includes(busca.value.toLowerCase()))
  .sort((a, b) => (a.data < b.data ? 1 : -1)))

const estadoInfo: Record<EstadoPresenca, { label: string, color: 'success' | 'warning' | 'error' }> = {
  presente: { label: 'Presente', color: 'success' },
  atraso: { label: 'Atraso', color: 'warning' },
  ausente: { label: 'Ausente', color: 'error' }
}

const colunas: TableColumn<Presenca>[] = [
  { accessorKey: 'funcionarioNome', header: 'Funcionário' },
  { accessorKey: 'departamento', header: 'Departamento' },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => formatarData(row.original.data)
  },
  {
    accessorKey: 'horaEntrada',
    header: 'Check-in',
    cell: ({ row }) => row.original.horaEntrada ?? '—'
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const info = estadoInfo[row.original.estado]
      return h(UBadge, { variant: 'subtle', color: info.color }, () => info.label)
    }
  }
]
</script>

<template>
  <UDashboardPanel id="frota-presencas">
    <template #header>
      <UDashboardNavbar title="Presenças da equipa">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center gap-1.5">
        <UInput
          v-model="busca"
          icon="i-lucide-search"
          placeholder="Procurar funcionário..."
          class="max-w-sm"
        />

        <USelect
          v-model="filtroDepartamento"
          :items="[{ label: 'Todos os departamentos', value: 'todos' }, ...departamentos.map(d => ({ label: d, value: d }))]"
          class="min-w-52"
        />
      </div>

      <UTable
        :data="listaFiltrada"
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
