<script setup lang="ts">
import type { Membro } from '~/types'

const { data: membros } = await useFetch<Membro[]>('/api/members', { default: () => [] })

const termoBusca = ref('')

const membrosFiltrados = computed(() => {
  return membros.value.filter((membro) => {
    return membro.name.search(new RegExp(termoBusca.value, 'i')) !== -1 || membro.username.search(new RegExp(termoBusca.value, 'i')) !== -1
  })
})
</script>

<template>
  <div>
    <UPageCard
      title="Membros"
      description="Convide novos membros pelo endereço de e-mail."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        label="Convidar pessoas"
        color="neutral"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle" :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch', header: 'p-4 mb-0 border-b border-default' }">
      <template #header>
        <UInput
          v-model="termoBusca"
          icon="i-lucide-search"
          placeholder="Buscar membros"
          autofocus
          class="w-full"
        />
      </template>

      <SettingsMembersList :membros="membrosFiltrados" />
    </UPageCard>
  </div>
</template>
