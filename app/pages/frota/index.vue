<script setup lang="ts">
useSeoMeta({
  title: 'Painel · Gestão de Frota e Equipa'
})
</script>

<template>
  <UDashboardPanel id="frota-home">
    <template #header>
      <UDashboardNavbar title="Painel da frota">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UBadge variant="subtle" color="neutral" icon="i-lucide-building-2">
            Kwanza Expresso
          </UBadge>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <FrotaStats />
      <FrotaTarefasUrgentes />
    </template>
  </UDashboardPanel>
</template>
