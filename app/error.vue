<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Página não encontrada',
  description: 'Lamentamos, mas não foi possível encontrar esta página.'
})

useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script>

<template>
  <UApp>
    <UError :error="error" />
  </UApp>
</template>
