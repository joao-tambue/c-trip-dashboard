<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Motorista } from '~/types'

const aberto = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  motorista?: Motorista | null
}>()

const emit = defineEmits<{
  guardar: [dados: Omit<Motorista, 'id' | 'avatar' | 'viagensMes'>, id?: number]
}>()

const esquema = z.object({
  name: z.string().min(3, 'Muito curto'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(9, 'Telefone inválido'),
  carta: z.string().min(4, 'Obrigatório'),
  disponibilidade: z.enum(['disponivel', 'em_viagem', 'folga'])
})

type Esquema = z.output<typeof esquema>

const estadoInicial: Esquema = { name: '', email: '', telefone: '+244 9', carta: '', disponibilidade: 'disponivel' }
const estado = reactive<Esquema>({ ...estadoInicial })

watch([aberto, () => props.motorista], ([estaAberto, motorista]) => {
  if (!estaAberto) return
  Object.assign(estado, motorista
    ? { name: motorista.name, email: motorista.email, telefone: motorista.telefone, carta: motorista.carta, disponibilidade: motorista.disponibilidade }
    : estadoInicial)
}, { immediate: true })

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  emit('guardar', event.data, props.motorista?.id)
  aberto.value = false
}
</script>

<template>
  <UModal
    v-model:open="aberto"
    :title="motorista ? 'Editar motorista' : 'Novo motorista'"
    description="O motorista poderá depois ser atribuído a horários pelo publicador de rotas."
  >
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
        <UFormField label="E-mail" name="email">
          <UInput v-model="estado.email" type="email" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Telefone" name="telefone">
            <UInput v-model="estado.telefone" class="w-full" />
          </UFormField>
          <UFormField label="Nº da carta de condução" name="carta">
            <UInput v-model="estado.carta" class="w-full font-mono" />
          </UFormField>
        </div>
        <UFormField label="Disponibilidade" name="disponibilidade">
          <USelect
            v-model="estado.disponibilidade"
            :items="[
              { label: 'Disponível', value: 'disponivel' },
              { label: 'Em viagem', value: 'em_viagem' },
              { label: 'Folga', value: 'folga' }
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
          <UButton :label="motorista ? 'Guardar alterações' : 'Registar motorista'" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
