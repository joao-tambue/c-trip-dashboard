<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Cidade } from '~/types'

useSeoMeta({
  title: 'Cidades · Administração C-Trip'
})

const USwitch = resolveComponent('USwitch')

const toast = useToast()

const { data } = await useFetch<Cidade[]>('/api/admin/cidades', { default: () => [] })
const lista = ref<Cidade[]>([])
watchEffect(() => {
  lista.value = data.value.map(cidade => ({ ...cidade }))
})

let proximoId = 100

function criarCidade(nova: Omit<Cidade, 'id'>) {
  lista.value.unshift({ id: proximoId++, ...nova })
  toast.add({ title: 'Cidade adicionada', description: `${nova.nome} já está disponível para as empresas criarem rotas.`, color: 'success' })
}

function alternarActiva(cidade: Cidade) {
  cidade.activa = !cidade.activa
  toast.add({
    title: cidade.activa ? 'Cidade activada' : 'Cidade desactivada',
    description: `${cidade.nome} ${cidade.activa ? 'passou a estar disponível' : 'deixou de estar disponível'} na pesquisa dos passageiros.`
  })
}

const colunas: TableColumn<Cidade>[] = [
  { accessorKey: 'nome', header: 'Cidade' },
  { accessorKey: 'provincia', header: 'Província' },
  { accessorKey: 'pais', header: 'País' },
  {
    id: 'activa',
    header: () => h('div', { class: 'text-right' }, 'Disponível na rede'),
    cell: ({ row }) => h('div', { class: 'flex justify-end' }, h(USwitch, {
      'modelValue': row.original.activa,
      'onUpdate:modelValue': () => alternarActiva(row.original)
    }))
  }
]
</script>

<template>
  <UDashboardPanel id="admin-cidades">
    <template #header>
      <UDashboardNavbar title="Cidades da rede">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <CidadeFormModal @criar="criarCidade" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <p class="text-sm text-muted -mt-2">
        Estas são as cidades disponíveis para as empresas parceiras criarem rotas e para os passageiros escolherem origem e destino.
      </p>

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
