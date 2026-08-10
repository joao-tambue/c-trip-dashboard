<script setup lang="ts">
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Horario, Rota } from '~/types'

useSeoMeta({
  title: 'Analytics · Publicador de Rotas'
})

const { data: rotas } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })
const { data: horarios } = await useFetch<Horario[]>('/api/publicador/horarios', { default: () => [] })

interface MetricaRota {
  rota: Rota
  horariosPublicados: number
  ocupacaoMedia: number
  receita: number
  tendencia: number
}

const metricas = computed<MetricaRota[]>(() => rotas.value.map((rota) => {
  const horariosRota = horarios.value.filter(h => h.rotaId === rota.id && h.estado !== 'cancelado')
  const ocupacaoMedia = horariosRota.length
    ? Math.round(horariosRota.reduce((soma, h) => soma + (h.lugaresOcupados / h.lugaresTotais), 0) / horariosRota.length * 100)
    : 0
  const receita = horariosRota.reduce((soma, h) => soma + h.lugaresOcupados * h.precoBase, 0)

  return {
    rota,
    horariosPublicados: horariosRota.length,
    ocupacaoMedia,
    receita,
    tendencia: inteiroAleatorio(-12, 24)
  }
}).sort((a, b) => b.receita - a.receita))

const receitaMaxima = computed(() => Math.max(...metricas.value.map(m => m.receita), 1))

const colunas: TableColumn<MetricaRota>[] = [
  {
    id: 'rota',
    header: 'Rota',
    cell: ({ row }) => `${row.original.rota.origem} → ${row.original.rota.destino}`
  },
  {
    id: 'horarios',
    header: () => h('div', { class: 'text-right' }, 'Horários'),
    cell: ({ row }) => h('div', { class: 'text-right' }, row.original.horariosPublicados)
  },
  {
    id: 'ocupacao',
    header: () => h('div', { class: 'text-right' }, 'Ocupação média'),
    cell: ({ row }) => h('div', { class: 'text-right' }, `${row.original.ocupacaoMedia}%`)
  },
  {
    id: 'receita',
    header: () => h('div', { class: 'text-right' }, 'Receita'),
    cell: ({ row }) => h('div', { class: 'text-right font-medium' }, formatarMoedaAOA(row.original.receita))
  },
  {
    id: 'tendencia',
    header: () => h('div', { class: 'text-right' }, 'Tendência de procura'),
    cell: ({ row }) => h('div', {
      class: ['text-right font-medium', row.original.tendencia >= 0 ? 'text-success' : 'text-error']
    }, `${row.original.tendencia > 0 ? '+' : ''}${row.original.tendencia}%`)
  }
]
</script>

<template>
  <UDashboardPanel id="publicador-analytics">
    <template #header>
      <UDashboardNavbar title="Analytics de rotas">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UCard>
        <template #header>
          <p class="font-semibold text-highlighted">
            Receita por rota · últimos 30 dias
          </p>
        </template>

        <div class="space-y-4">
          <div v-for="metrica in metricas" :key="metrica.rota.id" class="space-y-1">
            <div class="flex items-center justify-between text-sm">
              <span class="text-highlighted font-medium">{{ metrica.rota.origem }} → {{ metrica.rota.destino }}</span>
              <span class="text-muted">{{ formatarMoedaAOA(metrica.receita) }}</span>
            </div>
            <div class="h-2 rounded-full bg-elevated overflow-hidden">
              <div
                class="h-full rounded-full bg-primary"
                :style="{ width: `${Math.max((metrica.receita / receitaMaxima) * 100, 3)}%` }"
              />
            </div>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <p class="font-semibold text-highlighted">
            Detalhe por rota
          </p>
        </template>

        <UTable
          :data="metricas"
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
  </UDashboardPanel>
</template>
