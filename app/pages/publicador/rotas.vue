<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Rota } from '~/types'

useSeoMeta({
  title: 'Rotas · Publicador de Rotas'
})

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

const { data } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })
const lista = ref<Rota[]>([])
watchEffect(() => {
  lista.value = data.value.map(rota => ({ ...rota, paragens: rota.paragens.map(p => ({ ...p })) }))
})

let proximoId = 100
const formAberto = ref(false)
const rotaEmEdicao = ref<Rota | null>(null)

function novaRota() {
  rotaEmEdicao.value = null
  formAberto.value = true
}

function editarRota(rota: Rota) {
  rotaEmEdicao.value = rota
  formAberto.value = true
}

function guardarRota(dados: Omit<Rota, 'id'>, id?: number) {
  if (id) {
    const index = lista.value.findIndex(r => r.id === id)
    if (index !== -1) lista.value[index] = { id, ...dados }
    toast.add({ title: 'Rota actualizada', description: `${dados.origem} → ${dados.destino}`, color: 'success' })
  } else {
    lista.value.unshift({ id: proximoId++, ...dados })
    toast.add({ title: 'Rota criada', description: `${dados.origem} → ${dados.destino} já pode receber horários.`, color: 'success' })
  }
}

function alternarActiva(rota: Rota) {
  rota.activa = !rota.activa
  toast.add({
    title: rota.activa ? 'Rota activada' : 'Rota desactivada',
    description: `${rota.origem} → ${rota.destino} ${rota.activa ? 'voltou a aparecer' : 'deixou de aparecer'} na pesquisa. As reservas já feitas não são afectadas.`
  })
}

const colunas: TableColumn<Rota>[] = [
  {
    id: 'percurso',
    header: 'Percurso',
    cell: ({ row }) => h('div', undefined, [
      h('p', { class: 'font-medium text-highlighted' }, `${row.original.origem} → ${row.original.destino}`),
      h('p', { class: 'text-xs text-muted' }, row.original.paragens.length ? `Paragens: ${row.original.paragens.map(p => p.cidade).join(', ')}` : 'Rota directa')
    ])
  },
  {
    accessorKey: 'distanciaKm',
    header: () => h('div', { class: 'text-right' }, 'Distância'),
    cell: ({ row }) => h('div', { class: 'text-right' }, `${row.original.distanciaKm} km`)
  },
  {
    accessorKey: 'precoBase',
    header: () => h('div', { class: 'text-right' }, 'Preço final'),
    cell: ({ row }) => h('div', { class: 'text-right font-medium' }, formatarMoedaAOA(row.original.precoBase))
  },
  {
    accessorKey: 'activa',
    header: 'Estado',
    cell: ({ row }) => h(UBadge, {
      variant: 'subtle',
      color: row.original.activa ? 'success' : 'neutral'
    }, () => row.original.activa ? 'Activa' : 'Inactiva')
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' }, h(UDropdownMenu, {
      content: { align: 'end' },
      items: [
        { label: 'Editar rota', icon: 'i-lucide-pencil', onSelect: () => editarRota(row.original) },
        {
          label: row.original.activa ? 'Desactivar rota' : 'Activar rota',
          icon: row.original.activa ? 'i-lucide-ban' : 'i-lucide-check',
          onSelect: () => alternarActiva(row.original)
        }
      ]
    }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost' })))
  }
]
</script>

<template>
  <UDashboardPanel id="publicador-rotas">
    <template #header>
      <UDashboardNavbar title="Rotas">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton label="Nova rota" icon="i-lucide-plus" @click="novaRota" />
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

  <RotaFormModal v-model:open="formAberto" :rota="rotaEmEdicao" @guardar="guardarRota" />
</template>
