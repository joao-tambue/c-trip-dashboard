<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormError, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Redefinir senha'
})

const rota = useRoute()
const toast = useToast()
const carregando = ref(false)

const token = computed(() => rota.query.token as string | undefined)

const campos: AuthFormField[] = [{
  name: 'password',
  type: 'password',
  label: 'Nova senha',
  placeholder: 'Digite a nova senha',
  required: true
}, {
  name: 'passwordConfirm',
  type: 'password',
  label: 'Confirme a nova senha',
  placeholder: 'Digite a nova senha novamente',
  required: true
}]

const esquema = z.object({
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
  passwordConfirm: z.string().min(8, 'Deve ter pelo menos 8 caracteres')
})

type Esquema = z.output<typeof esquema>

function validar(estado: Partial<Esquema>): FormError[] {
  const erros: FormError[] = []
  if (estado.password && estado.passwordConfirm && estado.password !== estado.passwordConfirm) {
    erros.push({ name: 'passwordConfirm', message: 'As senhas não coincidem' })
  }
  return erros
}

async function aoEnviar(_evento: FormSubmitEvent<Esquema>) {
  carregando.value = true

  // TODO: enviar `token.value` junto com a nova senha para a API
  await new Promise(resolve => setTimeout(resolve, 800))

  carregando.value = false

  toast.add({
    title: 'Senha redefinida',
    description: 'Sua senha foi atualizada. Você já pode entrar com a nova senha.',
    color: 'success'
  })

  await navigateTo('/login')
}
</script>

<template>
  <div v-if="!token" class="space-y-6 text-center">
    <UIcon name="i-lucide-shield-alert" class="size-10 text-error mx-auto" />

    <div>
      <p class="text-xl text-pretty font-semibold text-highlighted">
        Link inválido ou expirado
      </p>
      <p class="mt-1 text-muted text-pretty">
        Solicite um novo link para redefinir sua senha.
      </p>
    </div>

    <UButton to="/forgot-password" label="Solicitar novo link" block />
  </div>

  <UAuthForm
    v-else
    :schema="esquema"
    :fields="campos"
    :validate="validar"
    :loading="carregando"
    icon="i-lucide-shield-check"
    title="Defina uma nova senha"
    description="Escolha uma senha forte para proteger sua conta."
    :submit="{ label: 'Redefinir senha' }"
    @submit="aoEnviar"
  >
    <template #footer>
      <NuxtLink to="/login" class="text-primary font-medium">
        Voltar para o login
      </NuxtLink>
    </template>
  </UAuthForm>
</template>
