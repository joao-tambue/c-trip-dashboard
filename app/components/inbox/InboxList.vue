<script setup lang="ts">
import { format, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Email } from '~/types'

const props = defineProps<{
  emails: Email[]
}>()

const refsEmails = ref<Record<number, Element | null>>({})

const emailSelecionado = defineModel<Email | null>()

watch(emailSelecionado, () => {
  if (!emailSelecionado.value) {
    return
  }
  const ref = refsEmails.value[emailSelecionado.value.id]
  if (ref) {
    ref.scrollIntoView({ block: 'nearest' })
  }
})

defineShortcuts({
  arrowdown: () => {
    const index = props.emails.findIndex((email: Email) => email.id === emailSelecionado.value?.id)

    if (index === -1) {
      emailSelecionado.value = props.emails[0]
    } else if (index < props.emails.length - 1) {
      emailSelecionado.value = props.emails[index + 1]
    }
  },
  arrowup: () => {
    const index = props.emails.findIndex((email: Email) => email.id === emailSelecionado.value?.id)

    if (index === -1) {
      emailSelecionado.value = props.emails[props.emails.length - 1]
    } else if (index > 0) {
      emailSelecionado.value = props.emails[index - 1]
    }
  }
})
</script>

<template>
  <div class="overflow-y-auto divide-y divide-default">
    <div
      v-for="(email, index) in emails"
      :key="index"
      :ref="(el) => { refsEmails[email.id] = el as Element | null }"
    >
      <div
        class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
        :class="[
          email.unread ? 'text-highlighted' : 'text-toned',
          emailSelecionado && emailSelecionado.id === email.id
            ? 'border-primary bg-primary/10'
            : 'border-bg hover:border-primary hover:bg-primary/5'
        ]"
        @click="emailSelecionado = email"
      >
        <div class="flex items-center justify-between" :class="[email.unread && 'font-semibold']">
          <div class="flex items-center gap-3">
            {{ email.from.name }}

            <UChip v-if="email.unread" />
          </div>

          <span>{{ isToday(new Date(email.date)) ? format(new Date(email.date), 'HH:mm') : format(new Date(email.date), 'dd MMM', { locale: ptBR }) }}</span>
        </div>
        <p class="truncate" :class="[email.unread && 'font-semibold']">
          {{ email.subject }}
        </p>
        <p class="text-dimmed line-clamp-1">
          {{ email.body }}
        </p>
      </div>
    </div>
  </div>
</template>
