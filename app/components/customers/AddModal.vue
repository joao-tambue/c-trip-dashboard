<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const esquema = z.object({
  name: z.string().min(2, 'Muito curto'),
  email: z.string().email('E-mail inválido')
})
const aberto = ref(false)

type Esquema = z.output<typeof esquema>

const estado = reactive<Partial<Esquema>>({
  name: '',
  email: ''
})

const toast = useToast()
async function aoEnviar(event: FormSubmitEvent<Esquema>) {
  toast.add({ title: 'Sucesso', description: `Novo cliente ${event.data.name} adicionado`, color: 'success' })
  aberto.value = false
}
</script>

<template>
  <UModal v-model:open="aberto" title="Novo cliente" description="Adicione um novo cliente ao banco de dados">
    <UButton label="Novo cliente" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <UFormField label="Nome" placeholder="João da Silva" name="name">
          <UInput v-model="estado.name" class="w-full" />
        </UFormField>
        <UFormField label="E-mail" placeholder="joao.silva@example.com" name="email">
          <UInput v-model="estado.email" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="aberto = false"
          />
          <UButton
            label="Criar"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
