<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { MembroEquipa, PapelEquipa } from '~/types'

useSeoMeta({
  title: 'Equipa · Gestão de Frota'
})

const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const USwitch = resolveComponent('USwitch')

const toast = useToast()

const { data } = await useFetch<MembroEquipa[]>('/api/frota/equipa', { default: () => [] })
const lista = ref<MembroEquipa[]>([])
watchEffect(() => {
  lista.value = [...data.value]
})

let proximoId = 100
const filtroPapel = ref<PapelEquipa | 'todos'>('todos')

const listaFiltrada = computed(() => lista.value.filter(membro => filtroPapel.value === 'todos' || membro.papel === filtroPapel.value))

function criarSubconta(dados: Omit<MembroEquipa, 'id' | 'avatar' | 'dataEntrada'>) {
  lista.value.unshift({
    id: proximoId,
    avatar: { src: `https://i.pravatar.cc/128?u=equipa-nova-${proximoId}` },
    dataEntrada: '2026-08-08',
    ...dados
  })
  proximoId++
  toast.add({ title: 'Subconta criada', description: `${dados.name} já pode aceder ao portal com o papel atribuído.`, color: 'success' })
}

function alternarEstado(membro: MembroEquipa) {
  membro.estado = membro.estado === 'activo' ? 'inactivo' : 'activo'
  toast.add({ title: membro.estado === 'activo' ? 'Acesso reactivado' : 'Acesso suspenso', description: membro.name })
}

const papelInfo: Record<PapelEquipa, { label: string, color: 'info' | 'success' | 'primary' }> = {
  motorista: { label: 'Motorista', color: 'info' },
  operador: { label: 'Operador de bilhética', color: 'success' },
  gestor_rota: { label: 'Gestor de rota', color: 'primary' }
}

const colunas: TableColumn<MembroEquipa>[] = [
  {
    accessorKey: 'name',
    header: 'Funcionário',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
      h(UAvatar, { ...row.original.avatar, alt: row.original.name, size: 'lg' }),
      h('div', undefined, [
        h('p', { class: 'font-medium text-highlighted' }, row.original.name),
        h('p', { class: 'text-xs text-muted' }, row.original.email)
      ])
    ])
  },
  {
    accessorKey: 'papel',
    header: 'Papel',
    cell: ({ row }) => {
      const info = papelInfo[row.original.papel]
      return h(UBadge, { variant: 'subtle', color: info.color }, () => info.label)
    }
  },
  {
    accessorKey: 'dataEntrada',
    header: 'Na empresa desde',
    cell: ({ row }) => formatarData(row.original.dataEntrada)
  },
  {
    id: 'estado',
    header: () => h('div', { class: 'text-right' }, 'Acesso activo'),
    cell: ({ row }) => h('div', { class: 'flex justify-end' }, h(USwitch, {
      'modelValue': row.original.estado === 'activo',
      'onUpdate:modelValue': () => alternarEstado(row.original)
    }))
  }
]
</script>

<template>
  <UDashboardPanel id="frota-equipa">
    <template #header>
      <UDashboardNavbar title="Equipa e subcontas">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <EquipaFormModal @criar="criarSubconta" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <USelect
        v-model="filtroPapel"
        :items="[
          { label: 'Todos os papéis', value: 'todos' },
          { label: 'Motorista', value: 'motorista' },
          { label: 'Operador de bilhética', value: 'operador' },
          { label: 'Gestor de rota', value: 'gestor_rota' }
        ]"
        class="max-w-56"
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
