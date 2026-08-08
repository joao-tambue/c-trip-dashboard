<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const aberto = ref(false)

const links = [[{
  label: 'Início',
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => {
    aberto.value = false
  }
}, {
  label: 'Caixa de entrada',
  icon: 'i-lucide-inbox',
  to: '/inbox',
  badge: '4',
  onSelect: () => {
    aberto.value = false
  }
}, {
  label: 'Clientes',
  icon: 'i-lucide-users',
  to: '/customers',
  onSelect: () => {
    aberto.value = false
  }
}, {
  label: 'Configurações',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  type: 'trigger',
  children: [{
    label: 'Geral',
    to: '/settings',
    exact: true,
    onSelect: () => {
      aberto.value = false
    }
  }, {
    label: 'Membros',
    to: '/settings/members',
    onSelect: () => {
      aberto.value = false
    }
  }, {
    label: 'Notificações',
    to: '/settings/notifications',
    onSelect: () => {
      aberto.value = false
    }
  }, {
    label: 'Segurança',
    to: '/settings/security',
    onSelect: () => {
      aberto.value = false
    }
  }]
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: '#'
  // target: '_blank'
}, {
  label: 'Ajuda e suporte',
  icon: 'i-lucide-info',
  to: '#'
  // target: '_blank'
}]] satisfies NavigationMenuItem[][]

const grupos = computed(() => [{
  id: 'links',
  label: 'Ir para',
  items: links.flat()
}, {
  id: 'code',
  label: 'Código',
  items: [{
    id: 'source',
    label: 'Ver código-fonte da página',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'Usamos cookies primários para melhorar sua experiência em nosso site.',
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
        <TeamsMenu :collapsed="collapsed" />
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
