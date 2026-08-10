<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Autocarro, EstadoHorario, Horario, Motorista, Rota } from '~/types'

useSeoMeta({
  title: 'Horários · Publicador de Rotas'
})

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

const { data } = await useFetch<Horario[]>('/api/publicador/horarios', { default: () => [] })
const { data: rotas } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })
const { data: autocarros } = await useFetch<Autocarro[]>('/api/frota/autocarros', { default: () => [] })
const { data: motoristas } = await useFetch<Motorista[]>('/api/frota/motoristas', { default: () => [] })

const lista = ref<Horario[]>([])
watchEffect(() => {
  lista.value = data.value.map(horario => ({ ...horario }))
})

let proximoId = 100

function criarHorario(dados: Omit<Horario, 'id' | 'estado' | 'lugaresOcupados'>) {
  lista.value.unshift({ id: proximoId++, estado: 'agendado', lugaresOcupados: 0, ...dados })
  toast.add({ title: 'Horário publicado', description: 'Já está visível na pesquisa dos passageiros.', color: 'success' })
}

function cancelarHorario(horario: Horario) {
  horario.estado = 'cancelado'
  toast.add({ title: 'Horário cancelado', description: 'Os passageiros com reserva serão notificados e reembolsados automaticamente.', color: 'warning' })
}

function nomeRota(rotaId: number) {
  const rota = rotas.value.find(r => r.id === rotaId)
  return rota ? `${rota.origem} → ${rota.destino}` : '—'
}

function matriculaAutocarro(autocarroId: number) {
  return autocarros.value.find(a => a.id === autocarroId)?.matricula ?? '—'
}

function nomeMotorista(motoristaId: number) {
  return motoristas.value.find(m => m.id === motoristaId)?.name ?? '—'
}

const filtroEstado = ref<EstadoHorario | 'todos'>('todos')
const filtroRota = ref<number | 'todas'>('todas')

const listaFiltrada = computed(() => lista.value
  .filter(h => filtroEstado.value === 'todos' || h.estado === filtroEstado.value)
  .filter(h => filtroRota.value === 'todas' || h.rotaId === filtroRota.value)
  .sort((a, b) => `${a.data}${a.horaPartida}`.localeCompare(`${b.data}${b.horaPartida}`)))

const estadoInfo: Record<EstadoHorario, { label: string, color: 'neutral' | 'info' | 'success' | 'error' }> = {
  agendado: { label: 'Agendado', color: 'neutral' },
  em_rota: { label: 'Em rota', color: 'info' },
  concluido: { label: 'Concluído', color: 'success' },
  cancelado: { label: 'Cancelado', color: 'error' }
}

const colunas: TableColumn<Horario>[] = [
  {
    id: 'rota',
    header: 'Rota',
    cell: ({ row }) => nomeRota(row.original.rotaId)
  },
  {
    id: 'partida',
    header: 'Partida',
    cell: ({ row }) => `${formatarData(row.original.data)} · ${row.original.horaPartida}`
  },
  {
    id: 'autocarro',
    header: 'Autocarro',
    cell: ({ row }) => matriculaAutocarro(row.original.autocarroId)
  },
  {
    id: 'motorista',
    header: 'Motorista',
    cell: ({ row }) => nomeMotorista(row.original.motoristaId)
  },
  {
    id: 'ocupacao',
    header: () => h('div', { class: 'text-right' }, 'Ocupação'),
    cell: ({ row }) => h('div', { class: 'text-right' }, `${row.original.lugaresOcupados}/${row.original.lugaresTotais}`)
  },
  {
    accessorKey: 'precoBase',
    header: () => h('div', { class: 'text-right' }, 'Preço'),
    cell: ({ row }) => h('div', { class: 'text-right' }, formatarMoedaAOA(row.original.precoBase))
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
    cell: ({ row }) => h('div', { class: 'text-right' }, h(UDropdownMenu, {
      content: { align: 'end' },
      items: [
        {
          label: 'Cancelar horário',
          icon: 'i-lucide-ban',
          color: 'error',
          disabled: row.original.estado === 'cancelado' || row.original.estado === 'concluido',
          onSelect: () => cancelarHorario(row.original)
        }
      ]
    }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost' })))
  }
]
</script>

<template>
  <UDashboardPanel id="publicador-horarios">
    <template #header>
      <UDashboardNavbar title="Horários">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <HorarioFormModal @criar="criarHorario" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center gap-1.5">
        <USelect
          v-model="filtroRota"
          :items="[{ label: 'Todas as rotas', value: 'todas' }, ...rotas.map(r => ({ label: `${r.origem} → ${r.destino}`, value: r.id }))]"
          class="min-w-52"
        />
        <USelect
          v-model="filtroEstado"
          :items="[
            { label: 'Todos os estados', value: 'todos' },
            { label: 'Agendado', value: 'agendado' },
            { label: 'Em rota', value: 'em_rota' },
            { label: 'Concluído', value: 'concluido' },
            { label: 'Cancelado', value: 'cancelado' }
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
    </template>
  </UDashboardPanel>
</template>
