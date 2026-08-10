<script setup lang="ts">
import type { CommandPaletteItem } from '@nuxt/ui'
import { configuracoesPerfil } from '~/utils/roleNav'

const route = useRoute()
const toast = useToast()
const { currentUser } = useAuth()

const aberto = ref(false)

const configuracao = computed(() => currentUser.value ? configuracoesPerfil[currentUser.value.perfil] : null)
const links = computed(() => configuracao.value?.links ?? [[], []])

watch(() => route.fullPath, () => {
  aberto.value = false
})

const grupos = computed(() => [{
  id: 'links',
  label: 'Ir para',
  // `NavigationMenuItem` e `CommandPaletteItem` divergem apenas no tipo de `chip`,
  // que não é usado nestes itens de navegação.
  items: links.value.flat() as CommandPaletteItem[]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'Este portal usa cookies essenciais para manter a sua sessão activa.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Aceitar',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Não aceitar',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="aberto"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <BrandHeader :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="grupos" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
