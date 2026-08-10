<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type { Perfil } from '~/types'
import { utilizadoresDemo } from '~/composables/useAuth'
import { configuracoesPerfil } from '~/utils/roleNav'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Entrar · C-Trip'
})

const route = useRoute()
const toast = useToast()
const { login } = useAuth()
const carregando = ref(false)

const campos: AuthFormField[] = [{
  name: 'email',
  type: 'text',
  label: 'E-mail',
  placeholder: 'nome.apelido@empresa.co.ao',
  required: true
}, {
  name: 'password',
  type: 'password',
  label: 'Senha',
  placeholder: 'Digite a sua senha',
  required: true
}, {
  name: 'remember',
  type: 'checkbox',
  label: 'Manter sessão iniciada neste dispositivo'
}]

const esquema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Deve ter pelo menos 6 caracteres'),
  remember: z.boolean().optional()
})

type Esquema = z.output<typeof esquema>

function entrarComo(perfil: Perfil) {
  login(perfil)

  const destino = typeof route.query.redirect === 'string'
    ? route.query.redirect
    : configuracoesPerfil[perfil].homePath

  navigateTo(destino)
}

async function aoEnviar(evento: FormSubmitEvent<Esquema>) {
  carregando.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  carregando.value = false

  const conta = Object.values(utilizadoresDemo).find(
    utilizador => utilizador.email.toLowerCase() === evento.data.email.toLowerCase()
  )

  if (!conta) {
    toast.add({
      title: 'Conta não encontrada',
      description: 'Este é um ambiente de demonstração — use uma das contas listadas abaixo.',
      color: 'error'
    })
    return
  }

  toast.add({
    title: 'Sessão iniciada',
    description: `Bem-vindo(a) de volta, ${conta.name}.`,
    color: 'success'
  })

  entrarComo(conta.perfil)
}
</script>

<template>
  <div class="space-y-6">
    <UAuthForm
      :schema="esquema"
      :fields="campos"
      :loading="carregando"
      icon="i-lucide-bus-front"
      title="Aceder ao portal C-Trip"
      description="Portal interno para a administração da plataforma e para as empresas transportadoras parceiras."
      :submit="{ label: 'Entrar' }"
      @submit="aoEnviar"
    >
      <template #password-hint>
        <NuxtLink to="/forgot-password" class="text-primary font-medium" tabindex="-1">
          Esqueceu a senha?
        </NuxtLink>
      </template>
    </UAuthForm>

    <div class="flex items-center gap-3">
      <USeparator />
      <span class="text-xs text-dimmed shrink-0 uppercase tracking-wide">Contas de demonstração</span>
      <USeparator />
    </div>

    <p class="text-xs text-muted text-pretty">
      Este protótipo não tem autenticação real. Escolha uma conta para entrar directamente com o perfil correspondente.
    </p>

    <div class="space-y-2">
      <button
        v-for="conta in utilizadoresDemo"
        :key="conta.perfil"
        type="button"
        class="w-full flex items-center gap-3 rounded-lg border border-default p-2.5 text-left transition-colors hover:bg-elevated/50 hover:border-primary/50 cursor-pointer"
        @click="entrarComo(conta.perfil)"
      >
        <UAvatar v-bind="conta.avatar" :alt="conta.name" size="md" />
        <span class="min-w-0 flex-1">
          <span class="block text-sm font-medium text-highlighted truncate">{{ conta.name }}</span>
          <span class="block text-xs text-muted truncate">{{ conta.cargo }} · {{ conta.empresa }}</span>
        </span>
        <UIcon name="i-lucide-arrow-right" class="size-4 text-dimmed shrink-0" />
      </button>
    </div>
  </div>
</template>
