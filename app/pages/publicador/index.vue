<script setup lang="ts">
useSeoMeta({
  title: 'Painel · Publicador de Rotas'
})
</script>

<template>
  <UDashboardPanel id="publicador-home">
    <template #header>
      <UDashboardNavbar title="Painel de rotas">
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
      <PublicadorStats />
      <PublicadorProximosHorarios />
    </template>
  </UDashboardPanel>
</template>
