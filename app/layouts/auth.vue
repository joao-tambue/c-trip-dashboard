<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex items-center justify-between p-4 sm:p-6">
      <NuxtLink to="/login" class="flex items-center gap-2 font-semibold text-highlighted">
        <UIcon name="i-lucide-bus-front" class="size-5 text-primary" />
        C-Trip
      </NuxtLink>

      <ClientOnly>
        <UButton
          :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          square
          aria-label="Alternar tema"
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        />

        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
    </header>

    <main class="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
      <UCard variant="subtle" class="w-full max-w-md">
        <slot />
      </UCard>
    </main>
  </div>
</template>
