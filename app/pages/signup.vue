<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Criar conta'
})

const toast = useToast()
const carregando = ref(false)

const campos: AuthFormField[] = [{
  name: 'name',
  type: 'text',
  label: 'Nome completo',
  placeholder: 'Seu nome',
  required: true
}, {
  name: 'email',
  type: 'text',
  label: 'E-mail',
  placeholder: 'voce@exemplo.com',
  required: true
}, {
  name: 'password',
  type: 'password',
  label: 'Senha',
  placeholder: 'Crie uma senha',
  hint: 'Mínimo de 8 caracteres',
  required: true
}, {
  name: 'terms',
  type: 'checkbox',
  label: 'Concordo com os Termos de Uso e a Política de Privacidade'
}]

const esquema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
  terms: z.boolean().refine(valor => valor === true, 'Você precisa aceitar os termos para continuar')
})

type Esquema = z.output<typeof esquema>

async function aoEnviar(evento: FormSubmitEvent<Esquema>) {
  carregando.value = true

  // TODO: substituir pela chamada real de cadastro
  await new Promise(resolve => setTimeout(resolve, 800))

  carregando.value = false

  toast.add({
    title: 'Conta criada',
    description: `Enviamos um e-mail de confirmação para ${evento.data.email}.`,
    color: 'success'
  })

  await navigateTo('/login')
}
</script>

<template>
  <UAuthForm
    :schema="esquema"
    :fields="campos"
    :loading="carregando"
    icon="i-lucide-user-plus"
    title="Crie sua conta"
    description="Comece a usar o painel gratuitamente."
    :submit="{ label: 'Criar conta' }"
    :providers="[{
      label: 'Cadastrar com Google',
      icon: 'i-simple-icons-google',
      variant: 'subtle',
      block: true
    }, {
      label: 'Cadastrar com GitHub',
      icon: 'i-simple-icons-github',
      variant: 'subtle',
      block: true
    }]"
    @submit="aoEnviar"
  >
    <template #footer>
      Já tem uma conta?
      <NuxtLink to="/login" class="text-primary font-medium">
        Entrar
      </NuxtLink>
    </template>
  </UAuthForm>
</template>
