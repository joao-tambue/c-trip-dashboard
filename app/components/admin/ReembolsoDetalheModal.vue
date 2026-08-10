<script setup lang="ts">
import type { Reembolso } from '~/types'

const aberto = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  reembolso: Reembolso | null
}>()

const emit = defineEmits<{
  aprovar: [reembolso: Reembolso]
  recusar: [reembolso: Reembolso]
}>()

const estadoInfo = computed(() => {
  if (!props.reembolso) return null

  return {
    pendente: { label: 'Pendente', color: 'warning' as const },
    aprovado: { label: 'Aprovado', color: 'success' as const },
    recusado: { label: 'Recusado', color: 'error' as const }
  }[props.reembolso.estado]
})
</script>

<template>
  <UModal v-model:open="aberto" title="Pedido de reembolso" :description="reembolso ? `${reembolso.passageiroNome} · ${reembolso.rota}` : ''">
    <template #body>
      <div v-if="reembolso" class="space-y-4">
        <div class="flex items-center justify-between">
          <UBadge v-if="estadoInfo" :color="estadoInfo.color" variant="subtle">
            {{ estadoInfo.label }}
          </UBadge>
          <span class="text-2xl font-semibold text-highlighted">{{ formatarMoedaAOA(reembolso.valor) }}</span>
        </div>

        <UFormField label="Passageiro">
          <p class="text-sm text-highlighted">
            {{ reembolso.passageiroNome }}
          </p>
          <p class="text-xs text-muted">
            {{ reembolso.passageiroEmail }}
          </p>
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Rota">
            <p class="text-sm text-highlighted">
              {{ reembolso.rota }}
            </p>
          </UFormField>
          <UFormField label="Data da viagem">
            <p class="text-sm text-highlighted">
              {{ formatarData(reembolso.dataViagem) }}
            </p>
          </UFormField>
        </div>

        <UFormField label="Motivo indicado pelo passageiro">
          <p class="text-sm text-muted text-pretty">
            {{ reembolso.motivo }}
          </p>
        </UFormField>

        <p class="text-xs text-dimmed">
          Pedido submetido em {{ formatarData(reembolso.dataPedido) }}
        </p>
      </div>
    </template>

    <template v-if="reembolso?.estado === 'pendente'" #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton
          label="Recusar"
          color="error"
          variant="subtle"
          @click="emit('recusar', reembolso!)"
        />
        <UButton label="Aprovar reembolso" color="primary" @click="emit('aprovar', reembolso!)" />
      </div>
    </template>
  </UModal>
</template>
