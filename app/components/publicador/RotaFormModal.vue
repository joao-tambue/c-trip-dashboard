<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Cidade, ParagemRota, Rota } from '~/types'

const aberto = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  rota?: Rota | null
}>()

const emit = defineEmits<{
  guardar: [dados: Omit<Rota, 'id'>, id?: number]
}>()

const { data: cidades } = await useFetch<Cidade[]>('/api/admin/cidades', { default: () => [] })
const opcoesCidade = computed(() => cidades.value.filter(c => c.activa).map(c => c.nome))

const esquema = z.object({
  origem: z.string().min(1, 'Escolha a origem'),
  destino: z.string().min(1, 'Escolha o destino'),
  distanciaKm: z.number().min(1),
  precoBase: z.number().min(1, 'Defina o preço final')
})

type Esquema = z.output<typeof esquema>

const estadoInicial: Esquema = { origem: '', destino: '', distanciaKm: 100, precoBase: 10000 }
const estado = reactive<Esquema>({ ...estadoInicial })
const paragens = ref<ParagemRota[]>([])

watch([aberto, () => props.rota], ([estaAberto, rota]) => {
  if (!estaAberto) return

  if (rota) {
    Object.assign(estado, { origem: rota.origem, destino: rota.destino, distanciaKm: rota.distanciaKm, precoBase: rota.precoBase })
    paragens.value = rota.paragens.map(p => ({ ...p }))
  } else {
    Object.assign(estado, estadoInicial)
    paragens.value = []
  }
}, { immediate: true })

function adicionarParagem() {
  paragens.value.push({ cidade: '', precoAcrescido: 0 })
}

function removerParagem(index: number) {
  paragens.value.splice(index, 1)
}

function aoEnviar(event: FormSubmitEvent<Esquema>) {
  const paragensValidas = paragens.value.filter(p => p.cidade)
  emit('guardar', { ...event.data, paragens: paragensValidas, activa: props.rota?.activa ?? true }, props.rota?.id)
  aberto.value = false
}
</script>

<template>
  <UModal
    v-model:open="aberto"
    :title="rota ? 'Editar rota' : 'Nova rota'"
    description="Defina o percurso completo e o preço de cada paragem intermédia."
    :ui="{ content: 'max-w-lg' }"
  >
    <template #body>
      <UForm
        :schema="esquema"
        :state="estado"
        class="space-y-4"
        @submit="aoEnviar"
      >
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Origem" name="origem">
            <USelect
              v-model="estado.origem"
              :items="opcoesCidade"
              placeholder="Cidade de origem"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Destino final" name="destino">
            <USelect
              v-model="estado.destino"
              :items="opcoesCidade"
              placeholder="Cidade de destino"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Distância (km)" name="distanciaKm">
            <UInputNumber v-model="estado.distanciaKm" :min="1" class="w-full" />
          </UFormField>
          <UFormField label="Preço até ao destino (Kz)" name="precoBase">
            <UInputNumber
              v-model="estado.precoBase"
              :min="0"
              :step="500"
              class="w-full"
            />
          </UFormField>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-medium text-highlighted">
              Paragens intermédias
            </p>
            <UButton
              label="Adicionar paragem"
              icon="i-lucide-plus"
              size="xs"
              color="neutral"
              variant="subtle"
              @click="adicionarParagem"
            />
          </div>

          <p v-if="!paragens.length" class="text-xs text-muted">
            Rota directa, sem paragens intermédias.
          </p>

          <div v-for="(paragem, index) in paragens" :key="index" class="flex items-end gap-2 mb-2">
            <UFormField label="Cidade" class="flex-1">
              <USelect
                v-model="paragem.cidade"
                :items="opcoesCidade"
                placeholder="Paragem"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Preço até aqui (Kz)" class="flex-1">
              <UInputNumber
                v-model="paragem.precoAcrescido"
                :min="0"
                :step="500"
                class="w-full"
              />
            </UFormField>
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              @click="removerParagem(index)"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="aberto = false"
          />
          <UButton :label="rota ? 'Guardar alterações' : 'Criar rota'" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
