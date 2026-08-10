<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Empresa, EstadoEmpresa } from '~/types'

useSeoMeta({
  title: 'Empresas · Administração C-Trip'
})

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

const { data } = await useFetch<Empresa[]>('/api/admin/empresas', { default: () => [] })
const lista = ref<Empresa[]>([])
watchEffect(() => {
  lista.value = data.value.map(empresa => ({ ...empresa }))
})

const filtroEstado = ref<EstadoEmpresa | 'todas'>('todas')
const busca = ref('')

const listaFiltrada = computed(() => lista.value.filter((empresa) => {
  const passaEstado = filtroEstado.value === 'todas' || empresa.estado === filtroEstado.value
  const passaBusca = empresa.nome.toLowerCase().includes(busca.value.toLowerCase())
  return passaEstado && passaBusca
}))

const estadoInfo: Record<EstadoEmpresa, { label: string, color: 'warning' | 'success' | 'error' }> = {
  pendente: { label: 'Pendente', color: 'warning' },
  verificada: { label: 'Verificada', color: 'success' },
  recusada: { label: 'Recusada', color: 'error' }
}

const slideoverAberto = ref(false)
const empresaSeleccionada = ref<Empresa | null>(null)

function verDetalhe(empresa: Empresa) {
  empresaSeleccionada.value = empresa
  slideoverAberto.value = true
}

function aprovar(empresa: Empresa) {
  empresa.estado = 'verificada'
  slideoverAberto.value = false
  toast.add({ title: 'Empresa aprovada', description: `${empresa.nome} já pode publicar rotas no marketplace.`, color: 'success' })
}

function recusar(empresa: Empresa) {
  empresa.estado = 'recusada'
  slideoverAberto.value = false
  toast.add({ title: 'Registo recusado', description: `O acesso de ${empresa.nome} foi recusado.`, color: 'error' })
}

function obterAccoes(empresa: Empresa) {
  const accoes = [{
    label: 'Ver detalhes',
    icon: 'i-lucide-list',
    onSelect: () => verDetalhe(empresa)
  }]

  if (empresa.estado === 'pendente') {
    accoes.push({
      label: 'Aprovar empresa',
      icon: 'i-lucide-check',
      onSelect: () => aprovar(empresa)
    }, {
      label: 'Recusar registo',
      icon: 'i-lucide-x',
      onSelect: () => recusar(empresa)
    })
  }

  return accoes
}

const colunas: TableColumn<Empresa>[] = [
  {
    accessorKey: 'nome',
    header: 'Empresa',
    cell: ({ row }) => h('div', undefined, [
      h('p', { class: 'font-medium text-highlighted' }, row.original.nome),
      h('p', { class: 'text-xs text-muted' }, `${row.original.cidadeSede} · NIF ${row.original.nif}`)
    ])
  },
  {
    accessorKey: 'responsavelNome',
    header: 'Responsável',
    cell: ({ row }) => h('div', undefined, [
      h('p', { class: 'text-highlighted' }, row.original.responsavelNome),
      h('p', { class: 'text-xs text-muted' }, row.original.responsavelEmail)
    ])
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
    accessorKey: 'rotasActivas',
    header: () => h('div', { class: 'text-right' }, 'Rotas'),
    cell: ({ row }) => h('div', { class: 'text-right' }, row.original.rotasActivas)
  },
  {
    accessorKey: 'vendas30d',
    header: () => h('div', { class: 'text-right' }, 'Vendas (30d)'),
    cell: ({ row }) => h('div', { class: 'text-right font-medium' }, formatarMoedaAOA(row.original.vendas30d))
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' }, h(UDropdownMenu, {
      content: { align: 'end' },
      items: obterAccoes(row.original)
    }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost' })))
  }
]
</script>

<template>
  <UDashboardPanel id="admin-empresas">
    <template #header>
      <UDashboardNavbar title="Empresas">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          v-model="busca"
          icon="i-lucide-search"
          placeholder="Procurar empresa..."
          class="max-w-sm"
        />

        <USelect
          v-model="filtroEstado"
          :items="[
            { label: 'Todos os estados', value: 'todas' },
            { label: 'Pendentes', value: 'pendente' },
            { label: 'Verificadas', value: 'verificada' },
            { label: 'Recusadas', value: 'recusada' }
          ]"
          class="min-w-44"
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

      <p v-if="!listaFiltrada.length" class="text-center text-sm text-muted py-6">
        Nenhuma empresa encontrada.
      </p>
    </template>
  </UDashboardPanel>

  <EmpresaDetalheSlideover
    v-model:open="slideoverAberto"
    :empresa="empresaSeleccionada"
    @aprovar="aprovar"
    @recusar="recusar"
  />
</template>
