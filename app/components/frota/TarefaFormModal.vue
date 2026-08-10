<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { MembroEquipa, Tarefa } from '~/types'

const aberto = ref(false)

const emit = defineEmits<{
  criar: [dados: Omit<Tarefa, 'id' | 'estado'>]
}>()

const { data: equipa } = await useFetch<MembroEquipa[]>('/api/frota/equipa', { default: () => [] })
const opcoesFuncionarios = computed(() => equipa.value.map(membro => membro.name))

const esquema = z.object({
  titulo: z.string().min(4, 'Muito curto'),
  descricao: z.string().min(4, 'Muito curto'),
  atribuidoA: z.string().min(1, 'Escolha um funcionário'),
  prioridade: z.enum(['baixa', 'media', 'alta']),
  prazo: z.string().min(1, 'Defina um prazo')
})

type Esquema = z.output<typeof esquema>

const estadoInicial: Esquema = { titulo: '', descricao: '', atribuidoA: '', prioridade: 'media', prazo: '' }
const estado = reactive<Esquema>({ ...estadoInicial })

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  emit('criar', event.data)
  aberto.value = false
  Object.assign(estado, estadoInicial)
}
</script>

<template>
  <UModal v-model:open="aberto" title="Nova tarefa" description="Atribua uma tarefa a um funcionário da equipa.">
    <UButton label="Nova tarefa" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <UFormField label="Título" name="titulo">
          <UInput v-model="estado.titulo" placeholder="Ex.: Verificar pneus do autocarro LD-12-34-EA" class="w-full" />
        </UFormField>
        <UFormField label="Descrição" name="descricao">
          <UTextarea
            v-model="estado.descricao"
            :rows="3"
            autoresize
            class="w-full"
          />
        </UFormField>
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Atribuir a" name="atribuidoA">
            <USelect
              v-model="estado.atribuidoA"
              :items="opcoesFuncionarios"
              placeholder="Escolher funcionário"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Prioridade" name="prioridade">
            <USelect
              v-model="estado.prioridade"
              :items="[
                { label: 'Baixa', value: 'baixa' },
                { label: 'Média', value: 'media' },
                { label: 'Alta', value: 'alta' }
              ]"
              class="w-full"
            />
          </UFormField>
        </div>
        <UFormField label="Prazo" name="prazo">
          <UInput v-model="estado.prazo" type="datetime-local" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="aberto = false"
          />
          <UButton label="Criar tarefa" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
