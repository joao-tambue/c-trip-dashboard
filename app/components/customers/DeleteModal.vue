<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
}>(), {
  count: 0
})

const aberto = ref(false)

async function aoEnviar() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  aberto.value = false
}
</script>

<template>
  <UModal
    v-model:open="aberto"
    :title="`Excluir ${count} cliente${count > 1 ? 's' : ''}`"
    :description="`Tem certeza? Esta ação não pode ser desfeita.`"
  >
    <slot />

    <template #body>
      <div class="flex justify-end gap-2">
        <UButton
          label="Cancelar"
          color="neutral"
          variant="subtle"
          @click="aberto = false"
        />
        <UButton
          label="Excluir"
          color="error"
          variant="solid"
          loading-auto
          @click="aoEnviar"
        />
      </div>
    </template>
  </UModal>
</template>
