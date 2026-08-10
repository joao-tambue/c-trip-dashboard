<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Autocarro } from '~/types'

const aberto = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  autocarro?: Autocarro | null
}>()

const emit = defineEmits<{
  guardar: [dados: Omit<Autocarro, 'id' | 'capacidade'>, id?: number]
}>()

const esquema = z.object({
  matricula: z.string().min(6, 'Matrícula inválida'),
  modelo: z.string().min(2, 'Muito curto'),
  filas: z.number().min(1).max(20),
  lugaresPorFila: z.number().min(1).max(6),
  estado: z.enum(['disponivel', 'manutencao'])
})

type Esquema = z.output<typeof esquema>

const estadoInicial: Esquema = { matricula: '', modelo: '', filas: 12, lugaresPorFila: 4, estado: 'disponivel' }
const estado = reactive<Esquema>({ ...estadoInicial })

watch([aberto, () => props.autocarro], ([estaAberto, autocarro]) => {
  if (!estaAberto) return
  Object.assign(estado, autocarro
    ? { matricula: autocarro.matricula, modelo: autocarro.modelo, filas: autocarro.filas, lugaresPorFila: autocarro.lugaresPorFila, estado: autocarro.estado }
    : estadoInicial)
}, { immediate: true })

const capacidadeEstimada = computed(() => estado.filas * estado.lugaresPorFila)

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  emit('guardar', event.data, props.autocarro?.id)
  aberto.value = false
}
</script>

<template>
  <UModal
    v-model:open="aberto"
    :title="autocarro ? 'Editar autocarro' : 'Novo autocarro'"
    description="A configuração de lugares define o mapa que o passageiro vê ao escolher o seu lugar."
  >
    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <UFormField label="Matrícula" name="matricula">
          <UInput v-model="estado.matricula" placeholder="Ex.: LD-45-67-EA" class="w-full font-mono" />
        </UFormField>
        <UFormField label="Modelo" name="modelo">
          <UInput v-model="estado.modelo" placeholder="Ex.: Mercedes-Benz O500RS" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Filas de lugares" name="filas">
            <UInputNumber
              v-model="estado.filas"
              :min="1"
              :max="20"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Lugares por fila" name="lugaresPorFila">
            <UInputNumber
              v-model="estado.lugaresPorFila"
              :min="1"
              :max="6"
              class="w-full"
            />
          </UFormField>
        </div>
        <p class="text-xs text-muted -mt-2">
          Capacidade total: <span class="font-medium text-highlighted">{{ capacidadeEstimada }} lugares</span>
        </p>
        <UFormField label="Estado" name="estado">
          <USelect
            v-model="estado.estado"
            :items="[
              { label: 'Disponível', value: 'disponivel' },
              { label: 'Em manutenção', value: 'manutencao' }
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
          <UButton :label="autocarro ? 'Guardar alterações' : 'Registar autocarro'" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
