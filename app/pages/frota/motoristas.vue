<script setup lang="ts">
import type { DisponibilidadeMotorista, Motorista } from '~/types'

useSeoMeta({
  title: 'Motoristas · Gestão de Frota'
})

const toast = useToast()

const { data } = await useFetch<Motorista[]>('/api/frota/motoristas', { default: () => [] })
const lista = ref<Motorista[]>([])
watchEffect(() => {
  lista.value = [...data.value]
})

const busca = ref('')
const filtroDisponibilidade = ref<DisponibilidadeMotorista | 'todos'>('todos')

const listaFiltrada = computed(() => {
  const termo = busca.value.toLowerCase()

  return lista.value.filter((motorista) => {
    const passaBusca = motorista.name.toLowerCase().includes(termo) || motorista.telefone.toLowerCase().includes(termo)
    const passaDisponibilidade = filtroDisponibilidade.value === 'todos' || motorista.disponibilidade === filtroDisponibilidade.value
    return passaBusca && passaDisponibilidade
  })
})

let proximoId = 100
const formAberto = ref(false)
const motoristaEmEdicao = ref<Motorista | null>(null)

function novoMotorista() {
  motoristaEmEdicao.value = null
  formAberto.value = true
}

function editarMotorista(motorista: Motorista) {
  motoristaEmEdicao.value = motorista
  formAberto.value = true
}

function eliminarMotorista(motorista: Motorista) {
  lista.value = lista.value.filter(m => m.id !== motorista.id)
  toast.add({ title: 'Motorista eliminado', description: `${motorista.name} foi removido da equipa de condução.`, color: 'error' })
}

function guardarMotorista(dados: Omit<Motorista, 'id' | 'avatar' | 'viagensMes'>, id?: number) {
  if (id) {
    const index = lista.value.findIndex(m => m.id === id)
    if (index !== -1) lista.value[index] = { ...lista.value[index]!, ...dados }
    toast.add({ title: 'Motorista actualizado', description: `${dados.name} foi actualizado.`, color: 'success' })
  } else {
    lista.value.unshift({
      id: proximoId,
      avatar: { src: `https://i.pravatar.cc/128?u=motorista-novo-${proximoId}` },
      viagensMes: 0,
      ...dados
    })
    proximoId++
    toast.add({ title: 'Motorista registado', description: `${dados.name} foi adicionado à equipa de condução.`, color: 'success' })
  }
}
</script>

<template>
  <UDashboardPanel id="frota-motoristas">
    <template #header>
      <UDashboardNavbar title="Motoristas">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton label="Novo motorista" icon="i-lucide-plus" @click="novoMotorista" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center gap-1.5">
        <UInput
          v-model="busca"
          icon="i-lucide-search"
          placeholder="Procurar por nome ou telefone..."
          class="max-w-sm"
        />

        <USelect
          v-model="filtroDisponibilidade"
          :items="[
            { label: 'Todas as disponibilidades', value: 'todos' },
            { label: 'Disponível', value: 'disponivel' },
            { label: 'Em viagem', value: 'em_viagem' },
            { label: 'Folga', value: 'folga' }
          ]"
          class="min-w-52"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <MotoristaCard
          v-for="motorista in listaFiltrada"
          :key="motorista.id"
          :motorista="motorista"
          @editar="editarMotorista"
          @eliminar="eliminarMotorista"
        />
      </div>

      <p v-if="!listaFiltrada.length" class="text-center text-sm text-muted py-6">
        Nenhum motorista encontrado.
      </p>
    </template>
  </UDashboardPanel>

  <MotoristaFormModal v-model:open="formAberto" :motorista="motoristaEmEdicao" @guardar="guardarMotorista" />
</template>
