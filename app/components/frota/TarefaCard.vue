<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { EstadoTarefa, PrioridadeTarefa, Tarefa } from '~/types'

const props = defineProps<{
  tarefa: Tarefa
}>()

const emit = defineEmits<{
  editar: [tarefa: Tarefa]
  eliminar: [tarefa: Tarefa]
  mover: [tarefa: Tarefa, estado: EstadoTarefa]
}>()

const prioridadeInfo: Record<PrioridadeTarefa, { label: string, color: 'error' | 'warning' | 'success' }> = {
  alta: { label: 'Alta', color: 'error' },
  media: { label: 'Média', color: 'warning' },
  baixa: { label: 'Baixa', color: 'success' }
}

const info = computed(() => prioridadeInfo[props.tarefa.prioridade])

const iniciais = computed(() => props.tarefa.atribuidoA.trim().charAt(0).toUpperCase())

// Data de referência do conjunto de dados de demonstração (ver FrotaStats.vue).
const HOJE = '2026-08-08'

const rotuloPrazo = computed(() => {
  if (props.tarefa.estado === 'concluida') return 'Concluída'
  return props.tarefa.prazo.slice(0, 10) === HOJE ? 'Hoje' : formatarData(props.tarefa.prazo)
})

const colunasAlvo: { estado: EstadoTarefa, label: string, icon: string }[] = [
  { estado: 'pendente', label: 'Mover para Por fazer', icon: 'i-lucide-circle-dashed' },
  { estado: 'em_curso', label: 'Mover para Em progresso', icon: 'i-lucide-loader-circle' },
  { estado: 'concluida', label: 'Mover para Concluído', icon: 'i-lucide-check-circle-2' }
]

const itens = computed<DropdownMenuItem[]>(() => [
  {
    label: 'Editar',
    icon: 'i-lucide-pencil',
    onSelect: () => emit('editar', props.tarefa)
  },
  ...colunasAlvo
    .filter(coluna => coluna.estado !== props.tarefa.estado)
    .map(coluna => ({
      label: coluna.label,
      icon: coluna.icon,
      onSelect: () => emit('mover', props.tarefa, coluna.estado)
    })),
  {
    label: 'Eliminar',
    icon: 'i-lucide-trash-2',
    color: 'error' as const,
    onSelect: () => emit('eliminar', props.tarefa)
  }
])

function aoArrastar(event: DragEvent) {
  if (!event.dataTransfer) return
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', String(props.tarefa.id))
}
</script>

<template>
  <UCard
    draggable="true"
    class="cursor-grab active:cursor-grabbing"
    :ui="{ body: 'p-4 sm:p-4' }"
    @dragstart="aoArrastar"
  >
    <div class="flex items-center justify-between gap-2">
      <UBadge :color="info.color" variant="subtle">
        {{ info.label }}
      </UBadge>

      <UDropdownMenu :items="itens" :content="{ align: 'end' }">
        <UButton
          icon="i-lucide-ellipsis-vertical"
          color="neutral"
          variant="ghost"
          size="xs"
          aria-label="Acções da tarefa"
        />
      </UDropdownMenu>
    </div>

    <p class="mt-3 text-sm font-semibold text-highlighted">
      {{ tarefa.titulo }}
    </p>

    <div class="mt-3 flex items-center justify-between gap-2">
      <div class="flex min-w-0 items-center gap-1.5">
        <span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-elevated text-[10px] font-bold text-highlighted">
          {{ iniciais }}
        </span>
        <span class="truncate text-xs text-muted">{{ tarefa.atribuidoA }}</span>
      </div>
      <span class="shrink-0 text-xs text-dimmed">{{ rotuloPrazo }}</span>
    </div>
  </UCard>
</template>
