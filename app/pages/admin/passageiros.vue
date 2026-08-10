<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Passageiro } from '~/types'

useSeoMeta({
  title: 'Passageiros · Administração C-Trip'
})

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

const { data } = await useFetch<Passageiro[]>('/api/admin/passageiros', { default: () => [] })
const lista = ref<Passageiro[]>([])
watchEffect(() => {
  lista.value = [...data.value]
})

const busca = ref('')

const listaFiltrada = computed<Passageiro[]>(() => {
  const termo = busca.value.toLowerCase()
  const resultado: Passageiro[] = []

  for (const passageiro of lista.value) {
    if (passageiro.name.toLowerCase().includes(termo) || passageiro.email.toLowerCase().includes(termo)) {
      resultado.push(passageiro)
    }
  }

  return resultado
})

function alternarBloqueio(passageiro: Passageiro) {
  passageiro.estado = passageiro.estado === 'activo' ? 'bloqueado' : 'activo'
  toast.add({
    title: passageiro.estado === 'bloqueado' ? 'Conta bloqueada' : 'Conta reactivada',
    description: `${passageiro.name} foi ${passageiro.estado === 'bloqueado' ? 'bloqueado(a) por suporte' : 'reactivado(a)'}.`,
    color: passageiro.estado === 'bloqueado' ? 'warning' : 'success'
  })
}

function verReservas(passageiro: Passageiro) {
  toast.add({
    title: 'Histórico de reservas',
    description: `${passageiro.name} tem ${passageiro.totalReservas} reserva(s) registada(s).`
  })
}

const colunas: TableColumn<Passageiro>[] = [
  {
    accessorKey: 'name',
    header: 'Passageiro',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
      h(UAvatar, { ...row.original.avatar, alt: row.original.name, size: 'lg' }),
      h('div', undefined, [
        h('p', { class: 'font-medium text-highlighted' }, row.original.name),
        h('p', { class: 'text-xs text-muted' }, row.original.email)
      ])
    ])
  },
  {
    accessorKey: 'telefone',
    header: 'Telefone'
  },
  {
    accessorKey: 'dataRegisto',
    header: 'Registo',
    cell: ({ row }) => formatarData(row.original.dataRegisto)
  },
  {
    accessorKey: 'totalReservas',
    header: () => h('div', { class: 'text-right' }, 'Reservas'),
    cell: ({ row }) => h('div', { class: 'text-right' }, row.original.totalReservas)
  },
  {
    accessorKey: 'ultimaViagem',
    header: 'Última viagem',
    cell: ({ row }) => row.original.ultimaViagem ? formatarData(row.original.ultimaViagem) : '—'
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => h(UBadge, {
      variant: 'subtle',
      color: row.original.estado === 'activo' ? 'success' : 'error'
    }, () => row.original.estado === 'activo' ? 'Activo' : 'Bloqueado')
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' }, h(UDropdownMenu, {
      content: { align: 'end' },
      items: [
        { label: 'Ver reservas', icon: 'i-lucide-list', onSelect: () => verReservas(row.original) },
        { type: 'separator' },
        {
          label: row.original.estado === 'activo' ? 'Bloquear conta' : 'Reactivar conta',
          icon: row.original.estado === 'activo' ? 'i-lucide-shield-off' : 'i-lucide-shield-check',
          color: row.original.estado === 'activo' ? 'error' : 'success',
          onSelect: () => alternarBloqueio(row.original)
        }
      ]
    }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost' })))
  }
]
</script>

<template>
  <UDashboardPanel id="admin-passageiros">
    <template #header>
      <UDashboardNavbar title="Passageiros">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UInput
        v-model="busca"
        icon="i-lucide-search"
        placeholder="Procurar por nome ou e-mail..."
        class="max-w-sm"
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
    </template>
  </UDashboardPanel>
</template>
