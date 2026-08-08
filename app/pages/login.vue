<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Entrar'
})

const toast = useToast()
const carregando = ref(false)

const campos: AuthFormField[] = [{
  name: 'email',
  type: 'text',
  label: 'E-mail',
  placeholder: 'voce@exemplo.com',
  required: true
}, {
  name: 'password',
  type: 'password',
  label: 'Senha',
  placeholder: 'Digite sua senha',
  required: true
}, {
  name: 'remember',
  type: 'checkbox',
  label: 'Lembrar de mim'
}]

const esquema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
  remember: z.boolean().optional()
})

type Esquema = z.output<typeof esquema>

async function aoEnviar(evento: FormSubmitEvent<Esquema>) {
  carregando.value = true

  // TODO: substituir pela chamada real de autenticação
  await new Promise(resolve => setTimeout(resolve, 800))

  carregando.value = false

  toast.add({
    title: 'Login efetuado',
    description: `Bem-vindo de volta, ${evento.data.email}!`,
    color: 'success'
  })

  await navigateTo('/')
}
</script>

<template>
  <UAuthForm
    :schema="esquema"
    :fields="campos"
    :loading="carregando"
    icon="i-lucide-lock-keyhole"
    title="Bem-vindo de volta"
    description="Entre com sua conta para acessar o painel."
    :submit="{ label: 'Entrar' }"
    :providers="[{
      label: 'Continuar com o Google',
      icon: 'i-simple-icons-google',
      variant: 'subtle',
      block: true
    }, {
      label: 'Continuar com o GitHub',
      icon: 'i-simple-icons-github',
      variant: 'subtle',
      block: true
    }]"
    @submit="aoEnviar"
  >
    <template #password-hint>
      <NuxtLink to="/forgot-password" class="text-primary font-medium" tabindex="-1">
        Esqueceu a senha?
      </NuxtLink>
    </template>

    <template #footer>
      Não tem uma conta?
      <NuxtLink to="/signup" class="text-primary font-medium">
        Criar conta
      </NuxtLink>
    </template>
  </UAuthForm>
</template>
