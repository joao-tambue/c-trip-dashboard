<script setup lang="ts">
const estado = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  atualizacoes_produto: true,
  resumo_semanal: false,
  atualizacoes_importantes: true
})

const secoes = [{
  title: 'Canais de notificação',
  description: 'Onde podemos notificar você?',
  fields: [{
    name: 'email',
    label: 'E-mail',
    description: 'Receba um resumo diário por e-mail.'
  }, {
    name: 'desktop',
    label: 'Área de trabalho',
    description: 'Receba notificações na área de trabalho.'
  }]
}, {
  title: 'Actividade da plataforma',
  description: 'Receba avisos sobre o que acontece na sua área do C-Trip.',
  fields: [{
    name: 'resumo_semanal',
    label: 'Resumo semanal',
    description: 'Receba um resumo semanal de reservas, ocupação e receita.'
  }, {
    name: 'atualizacoes_produto',
    label: 'Novidades da plataforma',
    description: 'Receba um e-mail quando houver novas funcionalidades no portal C-Trip.'
  }, {
    name: 'atualizacoes_importantes',
    label: 'Avisos importantes',
    description: 'Receba e-mails sobre manutenções, segurança e alterações que afectem a sua conta.'
  }]
}]

async function aoMudar() {
  // Faz algo com os dados
  console.log(estado)
}
</script>

<template>
  <div v-for="(secao, index) in secoes" :key="index">
    <UPageCard
      :title="secao.title"
      :description="secao.description"
      variant="naked"
      class="mb-4"
    />

    <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-default' }">
      <UFormField
        v-for="campo in secao.fields"
        :key="campo.name"
        :name="campo.name"
        :label="campo.label"
        :description="campo.description"
        class="flex items-center justify-between not-last:pb-4 gap-2"
      >
        <USwitch
          v-model="estado[campo.name]"
          @update:model-value="aoMudar"
        />
      </UFormField>
    </UPageCard>
  </div>
</template>
