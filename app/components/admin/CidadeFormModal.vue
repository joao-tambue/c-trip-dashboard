<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Cidade } from '~/types'

const emit = defineEmits<{
  criar: [cidade: Omit<Cidade, 'id'>]
}>()

const aberto = ref(false)

const esquema = z.object({
  nome: z.string().min(2, 'Muito curto'),
  provincia: z.string().min(2, 'Muito curto'),
  pais: z.string().min(2, 'Muito curto')
})

type Esquema = z.output<typeof esquema>

const estado = reactive<Partial<Esquema>>({
  nome: '',
  provincia: '',
  pais: 'Angola'
})

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  emit('criar', { ...event.data, activa: true })
  aberto.value = false
  estado.nome = ''
  estado.provincia = ''
  estado.pais = 'Angola'
}
</script>

<template>
  <UModal v-model:open="aberto" title="Nova cidade" description="Adicione uma cidade à rede C-Trip para que as empresas possam criar rotas até lá.">
    <UButton label="Nova cidade" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <UFormField label="Cidade" name="nome">
          <UInput v-model="estado.nome" placeholder="Ex.: Saurimo" class="w-full" />
        </UFormField>
        <UFormField label="Província" name="provincia">
          <UInput v-model="estado.provincia" placeholder="Ex.: Lunda Sul" class="w-full" />
        </UFormField>
        <UFormField label="País" name="pais">
          <UInput v-model="estado.pais" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="aberto = false"
          />
          <UButton label="Adicionar cidade" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
