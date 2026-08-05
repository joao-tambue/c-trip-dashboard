<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { breakpointsTailwind } from '@vueuse/core'
import type { Email } from '~/types'

const itensAbas = [{
  label: 'Todos',
  value: 'all'
}, {
  label: 'Não lidos',
  value: 'unread'
}]
const abaSelecionada = ref('all')

const { data: emails } = await useFetch<Email[]>('/api/mails', { default: () => [] })

// Filtra os e-mails com base na aba selecionada
const emailsFiltrados = computed(() => {
  if (abaSelecionada.value === 'unread') {
    return emails.value.filter(email => !!email.unread)
  }

  return emails.value
})

const emailSelecionado = ref<Email | null>()

const painelEmailAberto = computed({
  get() {
    return !!emailSelecionado.value
  },
  set(value: boolean) {
    if (!value) {
      emailSelecionado.value = null
    }
  }
})

// Redefine o e-mail selecionado se ele não estiver entre os e-mails filtrados
watch(emailsFiltrados, () => {
  if (!emailsFiltrados.value.find(email => email.id === emailSelecionado.value?.id)) {
    emailSelecionado.value = null
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const eMovel = breakpoints.smaller('lg')
</script>

<template>
  <UDashboardPanel
    id="inbox-1"
    :default-size="25"
    :min-size="20"
    :max-size="30"
    resizable
  >
    <UDashboardNavbar title="Caixa de entrada">
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>
      <template #trailing>
        <UBadge :label="emailsFiltrados.length" variant="subtle" />
      </template>

      <template #right>
        <UTabs
          v-model="abaSelecionada"
          :items="itensAbas"
          :content="false"
          size="xs"
        />
      </template>
    </UDashboardNavbar>
    <InboxList v-model="emailSelecionado" :emails="emailsFiltrados" />
  </UDashboardPanel>

  <InboxMail v-if="emailSelecionado" :email="emailSelecionado" @close="emailSelecionado = null" />
  <div v-else class="hidden lg:flex flex-1 items-center justify-center">
    <UIcon name="i-lucide-inbox" class="size-32 text-dimmed" />
  </div>

  <ClientOnly>
    <USlideover v-if="eMovel" v-model:open="painelEmailAberto">
      <template #content>
        <InboxMail v-if="emailSelecionado" :email="emailSelecionado" @close="emailSelecionado = null" />
      </template>
    </USlideover>
  </ClientOnly>
</template>
