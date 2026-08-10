<script setup lang="ts">
import type { Empresa } from '~/types'

const aberto = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  empresa: Empresa | null
}>()

const emit = defineEmits<{
  aprovar: [empresa: Empresa]
  recusar: [empresa: Empresa]
}>()

const estadoInfo = computed(() => {
  if (!props.empresa) return null

  return {
    pendente: { label: 'Pendente', color: 'warning' as const },
    verificada: { label: 'Verificada', color: 'success' as const },
    recusada: { label: 'Recusada', color: 'error' as const }
  }[props.empresa.estado]
})
</script>

<template>
  <USlideover v-model:open="aberto" :title="empresa?.nome" :description="`NIF ${empresa?.nif}`">
    <template #body>
      <div v-if="empresa" class="space-y-6">
        <div class="flex items-center justify-between">
          <UBadge v-if="estadoInfo" :color="estadoInfo.color" variant="subtle">
            {{ estadoInfo.label }}
          </UBadge>
          <span class="text-xs text-muted">Registada em {{ formatarData(empresa.dataRegisto) }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-lg border border-default p-3">
            <p class="text-xs text-muted uppercase">
              Rotas activas
            </p>
            <p class="text-xl font-semibold text-highlighted">
              {{ empresa.rotasActivas }}
            </p>
          </div>
          <div class="rounded-lg border border-default p-3">
            <p class="text-xs text-muted uppercase">
              Vendas (30 dias)
            </p>
            <p class="text-xl font-semibold text-highlighted">
              {{ formatarMoedaAOA(empresa.vendas30d) }}
            </p>
          </div>
          <div class="rounded-lg border border-default p-3 col-span-2">
            <p class="text-xs text-muted uppercase">
              Reclamações de passageiros
            </p>
            <p class="text-xl font-semibold" :class="empresa.reclamacoes > 0 ? 'text-warning' : 'text-highlighted'">
              {{ empresa.reclamacoes }}
            </p>
          </div>
        </div>

        <div>
          <p class="text-xs text-muted uppercase mb-2">
            Responsável (super-admin)
          </p>
          <div class="flex items-center gap-3">
            <UAvatar :alt="empresa.responsavelNome" size="md" />
            <div>
              <p class="text-sm font-medium text-highlighted">
                {{ empresa.responsavelNome }}
              </p>
              <p class="text-xs text-muted">
                {{ empresa.responsavelEmail }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p class="text-xs text-muted uppercase mb-2">
            Cidade-sede
          </p>
          <p class="text-sm text-highlighted flex items-center gap-1.5">
            <UIcon name="i-lucide-map-pin" class="size-4 text-dimmed" />
            {{ empresa.cidadeSede }}
          </p>
        </div>
      </div>
    </template>

    <template v-if="empresa?.estado === 'pendente'" #footer>
      <UButton
        label="Recusar registo"
        color="error"
        variant="subtle"
        block
        @click="emit('recusar', empresa!)"
      />
      <UButton
        label="Aprovar empresa"
        color="primary"
        block
        @click="emit('aprovar', empresa!)"
      />
    </template>
  </USlideover>
</template>
