<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const colorMode = useColorMode()
const appConfig = useAppConfig()

const cores = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const neutros = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive']

const usuario = ref({
  name: 'Benjamin Canac',
  avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'Benjamin Canac'
  }
})

const itens = computed<DropdownMenuItem[][]>(() => ([[{
  type: 'label',
  label: usuario.value.name,
  avatar: usuario.value.avatar
}], [{
  label: 'Perfil',
  icon: 'i-lucide-user'
}, {
  label: 'Cobrança',
  icon: 'i-lucide-credit-card'
}, {
  label: 'Configurações',
  icon: 'i-lucide-settings',
  to: '/settings'
}], [{
  label: 'Tema',
  icon: 'i-lucide-palette',
  children: [{
    label: 'Primária',
    slot: 'chip',
    chip: appConfig.ui.colors.primary,
    content: {
      align: 'center',
      collisionPadding: 16
    },
    children: cores.map(cor => ({
      label: cor,
      chip: cor,
      slot: 'chip',
      checked: appConfig.ui.colors.primary === cor,
      type: 'checkbox',
      onSelect: (e) => {
        e.preventDefault()

        appConfig.ui.colors.primary = cor
      }
    }))
  }, {
    label: 'Neutra',
    slot: 'chip',
    chip: appConfig.ui.colors.neutral === 'neutral' ? 'old-neutral' : appConfig.ui.colors.neutral,
    content: {
      align: 'end',
      collisionPadding: 16
    },
    children: neutros.map(cor => ({
      label: cor,
      chip: cor === 'neutral' ? 'old-neutral' : cor,
      slot: 'chip',
      type: 'checkbox',
      checked: appConfig.ui.colors.neutral === cor,
      onSelect: (e) => {
        e.preventDefault()

        appConfig.ui.colors.neutral = cor
      }
    }))
  }]
}, {
  label: 'Aparência',
  icon: 'i-lucide-sun-moon',
  children: [{
    label: 'Claro',
    icon: 'i-lucide-sun',
    type: 'checkbox',
    checked: colorMode.value === 'light',
    onSelect(e: Event) {
      e.preventDefault()

      colorMode.preference = 'light'
    }
  }, {
    label: 'Escuro',
    icon: 'i-lucide-moon',
    type: 'checkbox',
    checked: colorMode.value === 'dark',
    onUpdateChecked(checked: boolean) {
      if (checked) {
        colorMode.preference = 'dark'
      }
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  }]
}], [{
  label: 'Modelos',
  icon: 'i-lucide-layout-template',
  children: [{
    label: 'Starter',
    to: 'https://starter-template.nuxt.dev/'
  }, {
    label: 'Landing',
    to: 'https://landing-template.nuxt.dev/'
  }, {
    label: 'Docs',
    to: 'https://docs-template.nuxt.dev/'
  }, {
    label: 'SaaS',
    to: 'https://saas-template.nuxt.dev/'
  }, {
    label: 'Dashboard',
    to: 'https://dashboard-template.nuxt.dev/',
    color: 'primary',
    checked: true,
    type: 'checkbox'
  }, {
    label: 'Chat',
    to: 'https://chat-template.nuxt.dev/'
  }, {
    label: 'Portfolio',
    to: 'https://portfolio-template.nuxt.dev/'
  }, {
    label: 'Changelog',
    to: 'https://changelog-template.nuxt.dev/'
  }]
}], [{
  label: 'Documentação',
  icon: 'i-lucide-book-open',
  to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
  target: '_blank'
}, {
  label: 'Repositório no GitHub',
  icon: 'i-simple-icons-github',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}, {
  label: 'Sair',
  icon: 'i-lucide-log-out'
}]]))
</script>

<template>
  <UDropdownMenu
    :items="itens"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...usuario,
        label: collapsed ? undefined : usuario?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed'
      }"
    />

    <template #chip-leading="{ item }">
      <div class="inline-flex items-center justify-center shrink-0 size-5">
        <span
          class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2"
          :style="{
            '--chip-light': `var(--color-${(item as any).chip}-500)`,
            '--chip-dark': `var(--color-${(item as any).chip}-400)`
          }"
        />
      </div>
    </template>
  </UDropdownMenu>
</template>
