<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Autocarro, EstadoAutocarro } from '~/types'

const props = defineProps<{
  autocarro: Autocarro
}>()

const emit = defineEmits<{
  'editar': [autocarro: Autocarro]
  'alternar-manutencao': [autocarro: Autocarro]
}>()

const estadoInfo: Record<EstadoAutocarro, { label: string, color: 'success' | 'warning' }> = {
  disponivel: { label: 'Disponível', color: 'success' },
  manutencao: { label: 'Em manutenção', color: 'warning' }
}

const info = computed(() => estadoInfo[props.autocarro.estado])

const itens = computed<DropdownMenuItem[]>(() => [{
  label: 'Editar',
  icon: 'i-lucide-pencil',
  onSelect: () => emit('editar', props.autocarro)
}, {
  label: props.autocarro.estado === 'disponivel' ? 'Marcar em manutenção' : 'Marcar disponível',
  icon: props.autocarro.estado === 'disponivel' ? 'i-lucide-wrench' : 'i-lucide-check',
  onSelect: () => emit('alternar-manutencao', props.autocarro)
}])
</script>

<template>
  <UCard :ui="{ body: 'p-5 sm:p-5' }">
    <div class="flex items-center justify-between">
      <div class="flex size-12 items-center justify-center rounded-[10px] bg-elevated">
        <UIcon name="i-lucide-bus" class="size-6 text-primary" />
      </div>

      <div class="flex items-center gap-1">
        <UBadge :color="info.color" variant="subtle">
          {{ info.label }}
        </UBadge>

        <UDropdownMenu :items="itens" :content="{ align: 'end' }">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </UDropdownMenu>
      </div>
    </div>

    <div class="mt-4 space-y-0.5">
      <p class="font-semibold text-highlighted">
        {{ autocarro.modelo }}
      </p>
      <p class="text-sm text-muted font-mono">
        {{ autocarro.matricula }}
      </p>
    </div>

    <USeparator class="my-4" />

    <div class="flex items-center gap-2 text-sm text-muted">
      <UIcon name="i-lucide-armchair" class="size-4 shrink-0" />
      <span>{{ autocarro.capacidade }} lugares configurados</span>
    </div>
  </UCard>
</template>
