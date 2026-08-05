<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const refArquivo = ref<HTMLInputElement>()

const esquemaPerfil = z.object({
  name: z.string().min(2, 'Muito curto'),
  email: z.string().email('E-mail inválido'),
  username: z.string().min(2, 'Muito curto'),
  avatar: z.string().optional(),
  bio: z.string().optional()
})

type EsquemaPerfil = z.output<typeof esquemaPerfil>

const perfil = reactive<Partial<EsquemaPerfil>>({
  name: 'Benjamin Canac',
  email: 'ben@nuxtlabs.com',
  username: 'benjamincanac',
  avatar: undefined,
  bio: undefined
})
const toast = useToast()
async function aoEnviar(event: FormSubmitEvent<EsquemaPerfil>) {
  toast.add({
    title: 'Sucesso',
    description: 'Suas configurações foram atualizadas.',
    icon: 'i-lucide-check',
    color: 'success'
  })
  console.log(event.data)
}

function aoMudarArquivo(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  perfil.avatar = URL.createObjectURL(input.files[0]!)
}

function aoClicarArquivo() {
  refArquivo.value?.click()
}
</script>

<template>
  <UForm
    id="settings"
    :schema="esquemaPerfil"
    :state="perfil"
    @submit="aoEnviar"
  >
    <UPageCard
      title="Perfil"
      description="Estas informações serão exibidas publicamente."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="settings"
        label="Salvar alterações"
        color="neutral"
        type="submit"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="name"
        label="Nome"
        description="Aparecerá em recibos, faturas e outras comunicações."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="perfil.name"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="E-mail"
        description="Usado para entrar, receber recibos por e-mail e atualizações de produto."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="perfil.email"
          type="email"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="username"
        label="Nome de usuário"
        description="Seu nome de usuário exclusivo para login e URL do seu perfil."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="perfil.username"
          type="username"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="avatar"
        label="Avatar"
        description="JPG, GIF ou PNG. Máx. 1MB."
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UAvatar
            :src="perfil.avatar"
            :alt="perfil.name"
            size="lg"
          />
          <UButton
            label="Escolher"
            color="neutral"
            @click="aoClicarArquivo"
          />
          <input
            ref="refArquivo"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="aoMudarArquivo"
          >
        </div>
      </UFormField>
      <USeparator />
      <UFormField
        name="bio"
        label="Biografia"
        description="Breve descrição do seu perfil. URLs são transformadas em links."
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full' }"
      >
        <UTextarea
          v-model="perfil.bio"
          :rows="5"
          autoresize
          class="w-full"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
