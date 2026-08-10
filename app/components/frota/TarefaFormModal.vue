<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { EstadoTarefa, MembroEquipa, Tarefa } from '~/types'

const aberto = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  tarefa?: Tarefa | null
  estadoInicial?: EstadoTarefa
}>()

const emit = defineEmits<{
  guardar: [dados: Omit<Tarefa, 'id'>, id?: number]
}>()

const { data: equipa } = await useFetch<MembroEquipa[]>('/api/frota/equipa', { default: () => [] })
const opcoesFuncionarios = computed(() => equipa.value.map(membro => membro.name))

const esquema = z.object({
  titulo: z.string().min(4, 'Muito curto'),
  descricao: z.string().min(4, 'Muito curto'),
  atribuidoA: z.string().min(1, 'Escolha um funcionário'),
  prioridade: z.enum(['baixa', 'media', 'alta']),
  prazo: z.string().min(1, 'Defina um prazo'),
  estado: z.enum(['pendente', 'em_curso', 'concluida'])
})

type Esquema = z.output<typeof esquema>

const estadoVazio: Esquema = { titulo: '', descricao: '', atribuidoA: '', prioridade: 'media', prazo: '', estado: 'pendente' }
const estado = reactive<Esquema>({ ...estadoVazio })

watch([aberto, () => props.tarefa], ([estaAberto, tarefa]) => {
  if (!estaAberto) return

  Object.assign(estado, tarefa
    ? { titulo: tarefa.titulo, descricao: tarefa.descricao, atribuidoA: tarefa.atribuidoA, prioridade: tarefa.prioridade, prazo: tarefa.prazo, estado: tarefa.estado }
    : { ...estadoVazio, estado: props.estadoInicial ?? 'pendente' })
}, { immediate: true })

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  emit('guardar', event.data, props.tarefa?.id)
  aberto.value = false
}
</script>

<template>
  <UModal
    v-model:open="aberto"
    :title="tarefa ? 'Editar tarefa' : 'Nova tarefa'"
    description="Atribua a tarefa a um funcionário e escolha em que coluna deve aparecer."
  >
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
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Prazo" name="prazo">
            <UInput v-model="estado.prazo" type="datetime-local" class="w-full" />
          </UFormField>
          <UFormField label="Coluna" name="estado">
            <USelect
              v-model="estado.estado"
              :items="[
                { label: 'Por fazer', value: 'pendente' },
                { label: 'Em progresso', value: 'em_curso' },
                { label: 'Concluído', value: 'concluida' }
              ]"
              class="w-full"
            />
          </UFormField>
        </div>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="aberto = false"
          />
          <UButton :label="tarefa ? 'Guardar alterações' : 'Criar tarefa'" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
