<script setup lang="ts">
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Horario, Mensagem, Rota } from '~/types'

useSeoMeta({
  title: 'Mensagens · Publicador de Rotas'
})

const toast = useToast()

const { data } = await useFetch<Mensagem[]>('/api/publicador/mensagens', { default: () => [] })
const { data: horarios } = await useFetch<Horario[]>('/api/publicador/horarios', { default: () => [] })
const { data: rotas } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })

const lista = ref<Mensagem[]>([])
watchEffect(() => {
  lista.value = [...data.value]
})

let proximoId = 100

function enviarMensagem(dados: Omit<Mensagem, 'id' | 'dataEnvio'>) {
  lista.value.unshift({ id: proximoId++, dataEnvio: '2026-08-08T09:00:00', ...dados })
  toast.add({
    title: 'Mensagem enviada',
    description: `${dados.destinatarios} passageiro(s) foram notificados.`,
    color: 'success'
  })
}

function descricaoHorario(horarioId: number) {
  const horario = horarios.value.find(h => h.id === horarioId)
  if (!horario) return 'Horário removido'
  const rota = rotas.value.find(r => r.id === horario.rotaId)
  return `${rota ? `${rota.origem} → ${rota.destino}` : 'Rota'} · ${formatarData(horario.data)} ${horario.horaPartida}`
}

const colunas: TableColumn<Mensagem>[] = [
  {
    accessorKey: 'assunto',
    header: 'Mensagem',
    cell: ({ row }) => h('div', undefined, [
      h('p', { class: 'font-medium text-highlighted' }, row.original.assunto),
      h('p', { class: 'text-xs text-muted' }, row.original.corpo)
    ])
  },
  {
    id: 'horario',
    header: 'Horário',
    cell: ({ row }) => descricaoHorario(row.original.horarioId)
  },
  {
    accessorKey: 'destinatarios',
    header: () => h('div', { class: 'text-right' }, 'Destinatários'),
    cell: ({ row }) => h('div', { class: 'text-right' }, row.original.destinatarios)
  },
  {
    accessorKey: 'dataEnvio',
    header: 'Enviada em',
    cell: ({ row }) => formatarDataHora(row.original.dataEnvio)
  }
]
</script>

<template>
  <UDashboardPanel id="publicador-mensagens">
    <template #header>
      <UDashboardNavbar title="Mensagens aos passageiros">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <MensagemFormModal @enviar="enviarMensagem" />
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

      <p v-if="!lista.length" class="text-center text-sm text-muted py-6">
        Ainda não enviou nenhuma mensagem.
      </p>
    </template>
  </UDashboardPanel>
</template>
