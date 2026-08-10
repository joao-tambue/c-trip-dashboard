<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { LogAuditoria, TipoEventoAuditoria } from '~/types'

const UBadge = resolveComponent('UBadge')

const { data } = await useFetch<LogAuditoria[]>('/api/admin/auditoria', { default: () => [] })

const recentes = computed(() => data.value.slice(0, 6))

const rotulos: Record<TipoEventoAuditoria, { label: string, color: 'success' | 'error' | 'warning' | 'info' | 'neutral' }> = {
  embarque: { label: 'Embarque', color: 'success' },
  cancelamento: { label: 'Cancelamento', color: 'warning' },
  reembolso: { label: 'Reembolso', color: 'info' },
  login: { label: 'Login', color: 'neutral' },
  aprovacao_empresa: { label: 'Aprovação de empresa', color: 'success' }
}

const colunas: TableColumn<LogAuditoria>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Quando',
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
  {
    accessorKey: 'actor',
    header: 'Responsável'
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição'
  }
]
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <div class="flex items-center justify-between">
        <p class="font-semibold text-highlighted">
          Actividade recente
        </p>
        <UButton
          to="/admin/auditoria"
          label="Ver auditoria"
          color="neutral"
          variant="link"
          size="sm"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </template>

    <UTable
      :data="recentes"
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
