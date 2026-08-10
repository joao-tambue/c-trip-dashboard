<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { DisponibilidadeMotorista, Motorista } from '~/types'

const props = defineProps<{
  motorista: Motorista
}>()

const emit = defineEmits<{
  editar: [motorista: Motorista]
  eliminar: [motorista: Motorista]
}>()

const itens = computed<DropdownMenuItem[]>(() => [{
  label: 'Editar',
  icon: 'i-lucide-pencil',
  onSelect: () => emit('editar', props.motorista)
}, {
  label: 'Eliminar',
  icon: 'i-lucide-trash-2',
  color: 'error',
  onSelect: () => emit('eliminar', props.motorista)
}])

// As classes de cor ficam por extenso (em vez de interpoladas) para que o
// Tailwind consiga detectá-las em tempo de build.
const disponibilidadeInfo: Record<DisponibilidadeMotorista, { label: string, color: 'success' | 'warning' | 'error', avatarClass: string }> = {
  disponivel: { label: 'Disponível', color: 'success', avatarClass: 'bg-success/15 text-success' },
  em_viagem: { label: 'Em viagem', color: 'warning', avatarClass: 'bg-warning/15 text-warning' },
  folga: { label: 'Folga', color: 'error', avatarClass: 'bg-error/15 text-error' }
}

const info = computed(() => disponibilidadeInfo[props.motorista.disponibilidade])

const iniciais = computed(() => {
  const partes = props.motorista.name.trim().split(/\s+/)
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1]?.[0] ?? '' : ''
  return `${primeira}${ultima}`.toUpperCase()
})
</script>

<template>
  <UCard :ui="{ root: 'relative', body: 'p-6 sm:p-6' }">
    <UDropdownMenu :items="itens" :content="{ align: 'end' }" class="absolute right-3 top-3">
      <UButton
        icon="i-lucide-ellipsis-vertical"
        color="neutral"
        variant="ghost"
        size="xs"
        aria-label="Acções do motorista"
      />
    </UDropdownMenu>

    <div class="flex flex-col items-center gap-2 text-center">
      <div
        class="flex size-14 items-center justify-center rounded-full font-bold"
        :class="info.avatarClass"
      >
        {{ iniciais }}
      </div>

      <UBadge :color="info.color" variant="subtle" :ui="{ base: 'rounded-full' }">
        {{ info.label }}
      </UBadge>
    </div>

    <div class="mt-4 text-center">
      <p class="font-semibold text-highlighted">
        {{ motorista.name }}
      </p>
      <p class="text-sm text-muted">
        {{ motorista.telefone }}
      </p>
    </div>

    <USeparator class="my-4" />

    <div class="flex items-center justify-center gap-2 text-sm text-muted">
      <UIcon name="i-lucide-user-check" class="size-4 shrink-0" />
      <span>{{ motorista.viagensMes }} viagens este mês</span>
    </div>
  </UCard>
</template>
