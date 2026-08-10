<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Autocarro, EstadoHorario, Horario, Motorista, Rota } from '~/types'

const UBadge = resolveComponent('UBadge')

const { data: horarios } = await useFetch<Horario[]>('/api/publicador/horarios', { default: () => [] })
const { data: rotas } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })
const { data: autocarros } = await useFetch<Autocarro[]>('/api/frota/autocarros', { default: () => [] })
const { data: motoristas } = await useFetch<Motorista[]>('/api/frota/motoristas', { default: () => [] })

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

const proximos = computed(() => horarios.value
  .filter(h => h.estado === 'agendado' || h.estado === 'em_rota')
  .sort((a, b) => `${a.data}${a.horaPartida}`.localeCompare(`${b.data}${b.horaPartida}`))
  .slice(0, 6))

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
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const info = estadoInfo[row.original.estado]
      return h(UBadge, { variant: 'subtle', color: info.color }, () => info.label)
    }
  }
]
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <div class="flex items-center justify-between">
        <p class="font-semibold text-highlighted">
          Próximos horários
        </p>
        <UButton
          to="/publicador/horarios"
          label="Ver todos"
          color="neutral"
          variant="link"
          size="sm"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </template>

    <UTable
      :data="proximos"
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
