<script setup lang="ts">
import type { EstadoTarefa, Tarefa } from '~/types'

useSeoMeta({
  title: 'Tarefas · Gestão de Frota'
})

const toast = useToast()

const { data } = await useFetch<Tarefa[]>('/api/frota/tarefas', { default: () => [] })
const lista = ref<Tarefa[]>([])
watchEffect(() => {
  lista.value = data.value.map(tarefa => ({ ...tarefa }))
})

let proximoId = 100
const formAberto = ref(false)
const tarefaEmEdicao = ref<Tarefa | null>(null)
const estadoAlvo = ref<EstadoTarefa>('pendente')

function novaTarefa(estado: EstadoTarefa = 'pendente') {
  tarefaEmEdicao.value = null
  estadoAlvo.value = estado
  formAberto.value = true
}

function editarTarefa(tarefa: Tarefa) {
  tarefaEmEdicao.value = tarefa
  estadoAlvo.value = tarefa.estado
  formAberto.value = true
}

function guardarTarefa(dados: Omit<Tarefa, 'id'>, id?: number) {
  if (id) {
    const index = lista.value.findIndex(t => t.id === id)
    if (index !== -1) lista.value[index] = { id, ...dados }
    toast.add({ title: 'Tarefa actualizada', description: `"${dados.titulo}" foi actualizada.`, color: 'success' })
  } else {
    lista.value.unshift({ id: proximoId++, ...dados })
    toast.add({ title: 'Tarefa criada', description: `Atribuída a ${dados.atribuidoA}.`, color: 'success' })
  }
}

function eliminarTarefa(tarefa: Tarefa) {
  lista.value = lista.value.filter(t => t.id !== tarefa.id)
  toast.add({ title: 'Tarefa eliminada', description: `"${tarefa.titulo}" foi removida.`, color: 'error' })
}

const colunasConfig: { estado: EstadoTarefa, titulo: string }[] = [
  { estado: 'pendente', titulo: 'Por fazer' },
  { estado: 'em_curso', titulo: 'Em progresso' },
  { estado: 'concluida', titulo: 'Concluído' }
]

function moverTarefa(tarefa: Tarefa, estado: EstadoTarefa) {
  if (tarefa.estado === estado) return
  tarefa.estado = estado
  toast.add({ title: 'Tarefa movida', description: `"${tarefa.titulo}" passou para "${colunasConfig.find(c => c.estado === estado)?.titulo}".` })
}

const colunas = computed(() => colunasConfig.map(coluna => ({
  ...coluna,
  tarefas: lista.value.filter(tarefa => tarefa.estado === coluna.estado)
})))

const colunaEmArrasto = ref<EstadoTarefa | null>(null)

function aoLargar(event: DragEvent, estado: EstadoTarefa) {
  colunaEmArrasto.value = null
  const id = Number(event.dataTransfer?.getData('text/plain'))
  const tarefa = lista.value.find(t => t.id === id)
  if (tarefa) moverTarefa(tarefa, estado)
}
</script>

<template>
  <UDashboardPanel id="frota-tarefas">
    <template #header>
      <UDashboardNavbar title="Tarefas">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton label="Nova tarefa" icon="i-lucide-plus" @click="novaTarefa()" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start">
        <div
          v-for="coluna in colunas"
          :key="coluna.estado"
          class="flex flex-col gap-3 rounded-lg p-2 -m-2 transition-colors"
          :class="colunaEmArrasto === coluna.estado ? 'bg-primary/5 ring-1 ring-primary/30' : ''"
          @dragover.prevent="colunaEmArrasto = coluna.estado"
          @dragleave="colunaEmArrasto = null"
          @drop.prevent="aoLargar($event, coluna.estado)"
        >
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center gap-2">
              <p class="font-semibold text-highlighted">
                {{ coluna.titulo }}
              </p>
              <span class="rounded-full bg-elevated px-2 py-0.5 text-xs font-medium text-muted">
                {{ coluna.tarefas.length }}
              </span>
            </div>

            <UButton
              icon="i-lucide-plus"
              color="neutral"
              variant="ghost"
              size="xs"
              :aria-label="`Nova tarefa em ${coluna.titulo}`"
              @click="novaTarefa(coluna.estado)"
            />
          </div>

          <div class="flex flex-col gap-3 min-h-24">
            <TarefaCard
              v-for="tarefa in coluna.tarefas"
              :key="tarefa.id"
              :tarefa="tarefa"
              @editar="editarTarefa"
              @eliminar="eliminarTarefa"
              @mover="moverTarefa"
            />

            <p v-if="!coluna.tarefas.length" class="rounded-lg border border-dashed border-default py-6 text-center text-xs text-dimmed">
              Sem tarefas nesta coluna.
            </p>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <TarefaFormModal
    v-model:open="formAberto"
    :tarefa="tarefaEmEdicao"
    :estado-inicial="estadoAlvo"
    @guardar="guardarTarefa"
  />
</template>
