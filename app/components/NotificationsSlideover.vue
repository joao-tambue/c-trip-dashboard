<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import type { Notificacao } from '~/types'

const { slideoverNotificacoesAberto } = usePainel()

const mensagensTempoAgo = {
  justNow: 'agora mesmo',
  past: (n: number | string) => /\d/.test(String(n)) ? `há ${n}` : n as string,
  future: (n: number | string) => /\d/.test(String(n)) ? `em ${n}` : n as string,
  month: (n: number, past: boolean) => n === 1 ? (past ? 'mês passado' : 'próximo mês') : `${n} meses`,
  year: (n: number, past: boolean) => n === 1 ? (past ? 'ano passado' : 'próximo ano') : `${n} anos`,
  day: (n: number, past: boolean) => n === 1 ? (past ? 'ontem' : 'amanhã') : `${n} dias`,
  week: (n: number, past: boolean) => n === 1 ? (past ? 'semana passada' : 'próxima semana') : `${n} semanas`,
  hour: (n: number) => n === 1 ? '1 hora' : `${n} horas`,
  minute: (n: number) => n === 1 ? '1 minuto' : `${n} minutos`,
  second: (n: number) => n === 1 ? '1 segundo' : `${n} segundos`,
  invalid: ''
}

const { data: notificacoes } = await useFetch<Notificacao[]>('/api/notifications')
</script>

<template>
  <USlideover
    v-model:open="slideoverNotificacoesAberto"
    title="Notificações"
  >
    <template #body>
      <NuxtLink
        v-for="notificacao in notificacoes"
        :key="notificacao.id"
        :to="`/inbox?id=${notificacao.id}`"
        class="px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
      >
        <UChip
          color="error"
          :show="!!notificacao.unread"
          inset
        >
          <UAvatar
            v-bind="notificacao.sender.avatar"
            :alt="notificacao.sender.name"
            size="md"
          />
        </UChip>

        <div class="text-sm flex-1">
          <p class="flex items-center justify-between">
            <span class="text-highlighted font-medium">{{ notificacao.sender.name }}</span>

            <time
              :datetime="notificacao.date"
              class="text-muted text-xs"
              v-text="formatTimeAgo(new Date(notificacao.date), { messages: mensagensTempoAgo })"
            />
          </p>

          <p class="text-dimmed">
            {{ notificacao.body }}
          </p>
        </div>
      </NuxtLink>
    </template>
  </USlideover>
</template>
