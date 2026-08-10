<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { EstadoReembolso, Reembolso } from '~/types'

useSeoMeta({
  title: 'Reembolsos · Administração C-Trip'
})

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const toast = useToast()

const { data } = await useFetch<Reembolso[]>('/api/admin/reembolsos', { default: () => [] })
const lista = ref<Reembolso[]>([])
watchEffect(() => {
  lista.value = data.value.map(reembolso => ({ ...reembolso }))
})

const filtroEstado = ref<EstadoReembolso | 'todos'>('pendente')

const listaFiltrada = computed(() => lista.value.filter(reembolso => filtroEstado.value === 'todos' || reembolso.estado === filtroEstado.value))

const estadoInfo: Record<EstadoReembolso, { label: string, color: 'warning' | 'success' | 'error' }> = {
  pendente: { label: 'Pendente', color: 'warning' },
  aprovado: { label: 'Aprovado', color: 'success' },
  recusado: { label: 'Recusado', color: 'error' }
}

const modalAberto = ref(false)
const reembolsoSeleccionado = ref<Reembolso | null>(null)

function verDetalhe(reembolso: Reembolso) {
  reembolsoSeleccionado.value = reembolso
  modalAberto.value = true
}

function aprovar(reembolso: Reembolso) {
  reembolso.estado = 'aprovado'
  modalAberto.value = false
  toast.add({ title: 'Reembolso aprovado', description: `${formatarMoedaAOA(reembolso.valor)} devolvidos a ${reembolso.passageiroNome}.`, color: 'success' })
}

function recusar(reembolso: Reembolso) {
  reembolso.estado = 'recusado'
  modalAberto.value = false
  toast.add({ title: 'Reembolso recusado', description: `O pedido de ${reembolso.passageiroNome} foi recusado.`, color: 'error' })
}

const colunas: TableColumn<Reembolso>[] = [
  {
    accessorKey: 'passageiroNome',
    header: 'Passageiro',
    cell: ({ row }) => h('div', undefined, [
      h('p', { class: 'font-medium text-highlighted' }, row.original.passageiroNome),
      h('p', { class: 'text-xs text-muted' }, row.original.passageiroEmail)
    ])
  },
  {
    accessorKey: 'rota',
    header: 'Rota'
  },
  {
    accessorKey: 'dataViagem',
    header: 'Data da viagem',
    cell: ({ row }) => formatarData(row.original.dataViagem)
  },
  {
    accessorKey: 'valor',
    header: () => h('div', { class: 'text-right' }, 'Valor'),
    cell: ({ row }) => h('div', { class: 'text-right font-medium' }, formatarMoedaAOA(row.original.valor))
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
    cell: ({ row }) => h('div', { class: 'text-right' }, h(UButton, {
      label: 'Analisar',
      color: 'neutral',
      variant: 'outline',
      size: 'sm',
      onClick: () => verDetalhe(row.original)
    }))
  }
]
</script>

<template>
  <UDashboardPanel id="admin-reembolsos">
    <template #header>
      <UDashboardNavbar title="Reembolsos">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <USelect
        v-model="filtroEstado"
        :items="[
          { label: 'Pendentes', value: 'pendente' },
          { label: 'Aprovados', value: 'aprovado' },
          { label: 'Recusados', value: 'recusado' },
          { label: 'Todos os estados', value: 'todos' }
        ]"
        class="max-w-52"
      />

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

      <p v-if="!listaFiltrada.length" class="text-center text-sm text-muted py-6">
        Nenhum pedido de reembolso neste estado.
      </p>
    </template>
  </UDashboardPanel>

  <ReembolsoDetalheModal
    v-model:open="modalAberto"
    :reembolso="reembolsoSeleccionado"
    @aprovar="aprovar"
    @recusar="recusar"
  />
</template>
