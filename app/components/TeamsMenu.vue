<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const equipes = ref([{
  label: 'Nuxt',
  avatar: {
    src: 'https://github.com/nuxt.png',
    alt: 'Nuxt'
  }
}, {
  label: 'NuxtHub',
  avatar: {
    src: 'https://github.com/nuxt-hub.png',
    alt: 'NuxtHub'
  }
}, {
  label: 'NuxtLabs',
  avatar: {
    src: 'https://github.com/nuxtlabs.png',
    alt: 'NuxtLabs'
  }
}])
const equipeSelecionada = ref(equipes.value[0])

const itens = computed<DropdownMenuItem[][]>(() => {
  return [equipes.value.map(equipe => ({
    ...equipe,
    onSelect() {
      equipeSelecionada.value = equipe
    }
  })), [{
    label: 'Criar equipe',
    icon: 'i-lucide-circle-plus'
  }, {
    label: 'Gerenciar equipes',
    icon: 'i-lucide-cog'
  }]]
})
</script>

<template>
  <UDropdownMenu
    :items="itens"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...equipeSelecionada,
        label: collapsed ? undefined : equipeSelecionada?.label,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed'
      }"
    />
  </UDropdownMenu>
</template>
