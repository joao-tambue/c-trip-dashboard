<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Recuperar senha · C-Trip'
})

const carregando = ref(false)
const enviado = ref(false)
const emailEnviado = ref('')

const campos: AuthFormField[] = [{
  name: 'email',
  type: 'text',
  label: 'E-mail',
  placeholder: 'nome.apelido@empresa.co.ao',
  required: true
}]

const esquema = z.object({
  email: z.string().email('E-mail inválido')
})

type Esquema = z.output<typeof esquema>

async function aoEnviar(evento: FormSubmitEvent<Esquema>) {
  carregando.value = true

  // TODO: substituir pelo envio real do e-mail de recuperação
  await new Promise(resolve => setTimeout(resolve, 800))

  carregando.value = false
  emailEnviado.value = evento.data.email
  enviado.value = true
}
</script>

<template>
  <UAuthForm
    v-if="!enviado"
    :schema="esquema"
    :fields="campos"
    :loading="carregando"
    icon="i-lucide-key-round"
    title="Esqueceu sua senha?"
    description="Informe seu e-mail e enviaremos um link para redefinir sua senha."
    :submit="{ label: 'Enviar link de recuperação' }"
    @submit="aoEnviar"
  >
    <template #footer>
      Lembrou a senha?
      <NuxtLink to="/login" class="text-primary font-medium">
        Voltar para o login
      </NuxtLink>
    </template>
  </UAuthForm>

  <div v-else class="space-y-6 text-center">
    <UIcon name="i-lucide-mail-check" class="size-10 text-primary mx-auto" />

    <div>
      <p class="text-xl text-pretty font-semibold text-highlighted">
        Verifique seu e-mail
      </p>
      <p class="mt-1 text-muted text-pretty">
        Enviamos um link de recuperação para <strong class="text-highlighted">{{ emailEnviado }}</strong>. Ele expira em 15 minutos.
      </p>
    </div>

    <UButton
      to="/login"
      label="Voltar para o login"
      variant="subtle"
      block
    />
  </div>
</template>
