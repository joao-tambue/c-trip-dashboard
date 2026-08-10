<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { LogAuditoria, TipoEventoAuditoria } from '~/types'

useSeoMeta({
  title: 'Auditoria · Administração C-Trip'
})

const UBadge = resolveComponent('UBadge')

const { data } = await useFetch<LogAuditoria[]>('/api/admin/auditoria', { default: () => [] })

const busca = ref('')
const filtroTipo = ref<TipoEventoAuditoria | 'todos'>('todos')

const rotulos: Record<TipoEventoAuditoria, { label: string, color: 'success' | 'error' | 'warning' | 'info' | 'neutral' }> = {
  embarque: { label: 'Embarque', color: 'success' },
  cancelamento: { label: 'Cancelamento', color: 'warning' },
  reembolso: { label: 'Reembolso', color: 'info' },
  login: { label: 'Login', color: 'neutral' },
  aprovacao_empresa: { label: 'Aprovação de empresa', color: 'success' }
}

const listaFiltrada = computed(() => data.value
  .filter(log => filtroTipo.value === 'todos' || log.tipo === filtroTipo.value)
  .filter((log) => {
    const termo = busca.value.toLowerCase()
    return log.actor.toLowerCase().includes(termo) || log.descricao.toLowerCase().includes(termo) || (log.empresa ?? '').toLowerCase().includes(termo)
  })
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))

const colunas: TableColumn<LogAuditoria>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Data/hora',
    cell: ({ row }) => formatarDataHora(row.original.timestamp)
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    cell: ({ row }) => {
      const info = rotulos[row.original.tipo]
      return h(UBadge, { variant: 'subtle', color: info.color }, () => info.label)
    }
  },
  { accessorKey: 'actor', header: 'Responsável' },
  {
    accessorKey: 'empresa',
    header: 'Empresa',
    cell: ({ row }) => row.original.empresa ?? '—'
  },
  { accessorKey: 'descricao', header: 'Descrição' }
]
</script>

<template>
  <UDashboardPanel id="admin-auditoria">
    <template #header>
      <UDashboardNavbar title="Logs de auditoria">
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
          placeholder="Procurar por responsável, empresa ou descrição..."
          class="max-w-sm"
        />

        <USelect
          v-model="filtroTipo"
          :items="[
            { label: 'Todos os tipos', value: 'todos' },
            { label: 'Embarque', value: 'embarque' },
            { label: 'Cancelamento', value: 'cancelamento' },
            { label: 'Reembolso', value: 'reembolso' },
            { label: 'Login', value: 'login' },
            { label: 'Aprovação de empresa', value: 'aprovacao_empresa' }
          ]"
          class="min-w-48"
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
