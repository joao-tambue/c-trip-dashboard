<script setup lang="ts">
import type { Autocarro } from '~/types'

useSeoMeta({
  title: 'Autocarros · Gestão de Frota'
})

const toast = useToast()

const { data } = await useFetch<Autocarro[]>('/api/frota/autocarros', { default: () => [] })
const lista = ref<Autocarro[]>([])
watchEffect(() => {
  lista.value = [...data.value]
})

let proximoId = 100
const formAberto = ref(false)
const autocarroEmEdicao = ref<Autocarro | null>(null)

function novoAutocarro() {
  autocarroEmEdicao.value = null
  formAberto.value = true
}

function editarAutocarro(autocarro: Autocarro) {
  autocarroEmEdicao.value = autocarro
  formAberto.value = true
}

function guardarAutocarro(dados: Omit<Autocarro, 'id' | 'capacidade'>, id?: number) {
  const capacidade = dados.filas * dados.lugaresPorFila

  if (id) {
    const index = lista.value.findIndex(a => a.id === id)
    if (index !== -1) lista.value[index] = { id, ...dados, capacidade }
    toast.add({ title: 'Autocarro actualizado', description: `${dados.matricula} foi actualizado.`, color: 'success' })
  } else {
    lista.value.unshift({ id: proximoId++, ...dados, capacidade })
    toast.add({ title: 'Autocarro registado', description: `${dados.matricula} foi adicionado à frota.`, color: 'success' })
  }
}

function alternarManutencao(autocarro: Autocarro) {
  autocarro.estado = autocarro.estado === 'disponivel' ? 'manutencao' : 'disponivel'
  toast.add({
    title: autocarro.estado === 'manutencao' ? 'Autocarro retirado de rotação' : 'Autocarro disponível',
    description: `${autocarro.matricula} — as rotas já publicadas não são afectadas.`
  })
}
</script>

<template>
  <UDashboardPanel id="frota-autocarros">
    <template #header>
      <UDashboardNavbar title="Autocarros">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton label="Novo autocarro" icon="i-lucide-plus" @click="novoAutocarro" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AutocarroCard
          v-for="autocarro in lista"
          :key="autocarro.id"
          :autocarro="autocarro"
          @editar="editarAutocarro"
          @alternar-manutencao="alternarManutencao"
        />
      </div>

      <p v-if="!lista.length" class="text-center text-sm text-muted py-6">
        Nenhum autocarro registado.
      </p>
    </template>
  </UDashboardPanel>

  <AutocarroFormModal v-model:open="formAberto" :autocarro="autocarroEmEdicao" @guardar="guardarAutocarro" />
</template>
