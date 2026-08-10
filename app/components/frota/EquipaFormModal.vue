<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { MembroEquipa } from '~/types'

const aberto = ref(false)

const emit = defineEmits<{
  criar: [dados: Omit<MembroEquipa, 'id' | 'avatar' | 'dataEntrada'>]
}>()

const esquema = z.object({
  name: z.string().min(3, 'Muito curto'),
  email: z.string().email('E-mail inválido'),
  papel: z.enum(['motorista', 'operador', 'gestor_rota'])
})

type Esquema = z.output<typeof esquema>

const estado = reactive<Esquema>({ name: '', email: '', papel: 'operador' })

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  emit('criar', { ...event.data, estado: 'activo' })
  aberto.value = false
  estado.name = ''
  estado.email = ''
  estado.papel = 'operador'
}
</script>

<template>
  <UModal v-model:open="aberto" title="Nova subconta" description="Crie o acesso de um novo funcionário da empresa, com o papel adequado à sua função.">
    <UButton label="Nova subconta" icon="i-lucide-user-plus" />

    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <UFormField label="Nome completo" name="name">
          <UInput v-model="estado.name" class="w-full" />
        </UFormField>
        <UFormField label="E-mail profissional" name="email">
          <UInput
            v-model="estado.email"
            type="email"
            placeholder="nome.apelido@kwanzaexpresso.co.ao"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Papel" name="papel" description="Define a que páginas e acções este funcionário tem acesso.">
          <USelect
            v-model="estado.papel"
            :items="[
              { label: 'Motorista', value: 'motorista' },
              { label: 'Operador de bilhética', value: 'operador' },
              { label: 'Gestor de rota (publicador)', value: 'gestor_rota' }
            ]"
            class="w-full"
          />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="aberto = false"
          />
          <UButton label="Criar subconta" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
