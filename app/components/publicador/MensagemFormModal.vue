<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Horario, Mensagem, Rota } from '~/types'

const aberto = ref(false)

const emit = defineEmits<{
  enviar: [dados: Omit<Mensagem, 'id' | 'dataEnvio'>]
}>()

const { data: horarios } = await useFetch<Horario[]>('/api/publicador/horarios', { default: () => [] })
const { data: rotas } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })

const opcoesHorario = computed(() => horarios.value
  .filter(h => h.estado === 'agendado' || h.estado === 'em_rota')
  .map((h) => {
    const rota = rotas.value.find(r => r.id === h.rotaId)
    return {
      label: `${rota ? `${rota.origem} → ${rota.destino}` : 'Rota'} · ${formatarData(h.data)} ${h.horaPartida} (${h.lugaresOcupados} passageiros)`,
      value: h.id
    }
  }))

const esquema = z.object({
  horarioId: z.number({ error: 'Escolha o horário' }),
  assunto: z.string().min(4, 'Muito curto'),
  corpo: z.string().min(10, 'Escreva uma mensagem mais completa')
})

type Esquema = z.output<typeof esquema>

const estadoInicial: Partial<Esquema> = { horarioId: undefined, assunto: '', corpo: '' }
const estado = reactive<Partial<Esquema>>({ ...estadoInicial })

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  const horario = horarios.value.find(h => h.id === event.data.horarioId)

  emit('enviar', { ...event.data, destinatarios: horario?.lugaresOcupados ?? 0 })
  aberto.value = false
  Object.assign(estado, estadoInicial)
}
</script>

<template>
  <UModal v-model:open="aberto" title="Enviar mensagem" description="A mensagem chega à app e ao e-mail de todos os passageiros com reserva neste horário.">
    <UButton label="Enviar mensagem" icon="i-lucide-megaphone" />

    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <UFormField label="Horário" name="horarioId">
          <USelect
            v-model="estado.horarioId"
            :items="opcoesHorario"
            value-key="value"
            placeholder="Escolher horário"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Assunto" name="assunto">
          <UInput v-model="estado.assunto" placeholder="Ex.: Partida adiantada 15 minutos" class="w-full" />
        </UFormField>
        <UFormField label="Mensagem" name="corpo">
          <UTextarea
            v-model="estado.corpo"
            :rows="4"
            autoresize
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
          <UButton label="Enviar aos passageiros" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
