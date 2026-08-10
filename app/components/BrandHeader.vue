<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const { currentUser, logout } = useAuth()

const itens = computed<DropdownMenuItem[][]>(() => [[{
  label: currentUser.value?.empresa ?? 'C-Trip',
  type: 'label'
}], [{
  label: 'Terminar sessão',
  icon: 'i-lucide-log-out',
  onSelect: () => {
    logout()
    navigateTo('/login')
  }
}]])
</script>

<template>
  <UDropdownMenu
    :items="itens"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{ trailingIcon: 'text-dimmed' }"
    >
      <span class="flex size-6 items-center justify-center rounded-md bg-primary text-inverted shrink-0">
        <UIcon name="i-lucide-bus-front" class="size-3.5" />
      </span>

      <span v-if="!collapsed" class="min-w-0 flex-1 text-left">
        <span class="block text-sm font-semibold text-highlighted leading-tight">C-Trip</span>
        <span class="block text-xs text-muted leading-tight truncate">{{ currentUser?.empresa }}</span>
      </span>

      <template #trailing>
        <UIcon v-if="!collapsed" name="i-lucide-chevrons-up-down" class="text-dimmed size-4 shrink-0" />
      </template>
    </UButton>
  </UDropdownMenu>
</template>
