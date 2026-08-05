<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Periodo, Intervalo, Venda } from '~/types'

const props = defineProps<{
  periodo: Periodo
  intervalo: Intervalo
}>()

const UBadge = resolveComponent('UBadge')

const emailsExemplo = [
  'joao.silva@example.com',
  'maria.souza@example.com',
  'pedro.oliveira@example.com',
  'julia.alves@example.com',
  'lucas.rocha@example.com'
]

const { data } = await useAsyncData('vendas', async () => {
  const vendas: Venda[] = []
  const dataAtual = new Date()

  for (let i = 0; i < 5; i++) {
    const horasAtras = inteiroAleatorio(0, 48)
    const date = new Date(dataAtual.getTime() - horasAtras * 3600000)

    vendas.push({
      id: (4600 - i).toString(),
      date: date.toISOString(),
      status: aleatorioDe(['pago', 'falhou', 'reembolsado']),
      email: aleatorioDe(emailsExemplo),
      amount: inteiroAleatorio(100, 1000)
    })
  }

  return vendas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}, {
  watch: [() => props.periodo, () => props.intervalo],
  default: () => []
})

const colunas: TableColumn<Venda>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        pago: 'success' as const,
        falhou: 'error' as const,
        reembolsado: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'E-mail'
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Valor'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]
</script>

<template>
  <UTable
    :data="data"
    :columns="colunas"
    class="shrink-0"
    :ui="{
      base: 'table-fixed border-separate border-spacing-0',
      thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
      td: 'border-b border-default'
    }"
  />
</template>
