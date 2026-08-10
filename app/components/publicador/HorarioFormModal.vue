<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Autocarro, Horario, Motorista, Rota } from '~/types'

const aberto = ref(false)

const emit = defineEmits<{
  criar: [dados: Omit<Horario, 'id' | 'estado' | 'lugaresOcupados'>]
}>()

const { data: rotas } = await useFetch<Rota[]>('/api/publicador/rotas', { default: () => [] })
const { data: autocarros } = await useFetch<Autocarro[]>('/api/frota/autocarros', { default: () => [] })
const { data: motoristas } = await useFetch<Motorista[]>('/api/frota/motoristas', { default: () => [] })

const opcoesRota = computed(() => rotas.value.filter(r => r.activa).map(r => ({ label: `${r.origem} → ${r.destino}`, value: r.id })))
const opcoesAutocarro = computed(() => autocarros.value.filter(a => a.estado === 'disponivel').map(a => ({ label: `${a.matricula} · ${a.modelo} (${a.capacidade} lug.)`, value: a.id })))
const opcoesMotorista = computed(() => motoristas.value.filter(m => m.disponibilidade !== 'em_viagem').map(m => ({ label: m.name, value: m.id })))

const esquema = z.object({
  rotaId: z.number({ error: 'Escolha a rota' }),
  data: z.string().min(1, 'Escolha a data'),
  horaPartida: z.string().min(1, 'Escolha a hora'),
  autocarroId: z.number({ error: 'Escolha o autocarro' }),
  motoristaId: z.number({ error: 'Escolha o motorista' })
})

type Esquema = z.output<typeof esquema>

const estadoInicial: Partial<Esquema> = { rotaId: undefined, data: '', horaPartida: '', autocarroId: undefined, motoristaId: undefined }
const estado = reactive<Partial<Esquema>>({ ...estadoInicial })

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  const rota = rotas.value.find(r => r.id === event.data.rotaId)
  const autocarro = autocarros.value.find(a => a.id === event.data.autocarroId)

  emit('criar', {
    ...event.data,
    precoBase: rota?.precoBase ?? 0,
    lugaresTotais: autocarro?.capacidade ?? 0
  })

  aberto.value = false
  Object.assign(estado, estadoInicial)
}
</script>

<template>
  <UModal v-model:open="aberto" title="Publicar horário" description="Este horário fica visível de imediato na pesquisa dos passageiros.">
    <UButton label="Publicar horário" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <UFormField label="Rota" name="rotaId">
          <USelect
            v-model="estado.rotaId"
            :items="opcoesRota"
            value-key="value"
            placeholder="Escolher rota"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Data" name="data">
            <UInput v-model="estado.data" type="date" class="w-full" />
          </UFormField>
          <UFormField label="Hora de partida" name="horaPartida">
            <UInput v-model="estado.horaPartida" type="time" class="w-full" />
          </UFormField>
        </div>

        <UFormField label="Autocarro" name="autocarroId" description="Só mostra autocarros disponíveis (fora de manutenção).">
          <USelect
            v-model="estado.autocarroId"
            :items="opcoesAutocarro"
            value-key="value"
            placeholder="Escolher autocarro"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Motorista" name="motoristaId">
          <USelect
            v-model="estado.motoristaId"
            :items="opcoesMotorista"
            value-key="value"
            placeholder="Escolher motorista"
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
          <UButton label="Publicar" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
