<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const refArquivo = ref<HTMLInputElement>()
const { currentUser } = useAuth()

const esquemaPerfil = z.object({
  name: z.string().min(2, 'Muito curto'),
  email: z.string().email('E-mail inválido'),
  cargo: z.string().min(2, 'Muito curto'),
  avatar: z.string().optional(),
  bio: z.string().optional()
})

type EsquemaPerfil = z.output<typeof esquemaPerfil>

const perfil = reactive<Partial<EsquemaPerfil>>({
  name: currentUser.value?.name,
  email: currentUser.value?.email,
  cargo: currentUser.value?.cargo,
  avatar: currentUser.value?.avatar?.src,
  bio: undefined
})

const toast = useToast()
async function aoEnviar(_event: FormSubmitEvent<EsquemaPerfil>) {
  toast.add({
    title: 'Sucesso',
    description: 'As suas informações foram actualizadas.',
    icon: 'i-lucide-check',
    color: 'success'
  })
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
      description="Estas informações identificam-no perante os restantes utilizadores do portal."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="settings"
        label="Guardar alterações"
        color="neutral"
        type="submit"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="name"
        label="Nome"
        description="Usado nos registos de auditoria e nas comunicações com empresas e passageiros."
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
        description="Usado para iniciar sessão no portal C-Trip."
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
        name="cargo"
        label="Cargo"
        description="Aparece junto ao seu nome no menu do portal."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="perfil.cargo"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="avatar"
        label="Fotografia"
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
        label="Notas"
        description="Visível apenas para si — use para lembretes internos. URLs são transformados em links."
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
