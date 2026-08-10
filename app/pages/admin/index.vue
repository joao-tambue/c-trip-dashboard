<script setup lang="ts">
useSeoMeta({
  title: 'Painel · Administração C-Trip'
})
</script>

<template>
  <UDashboardPanel id="admin-home">
    <template #header>
      <UDashboardNavbar title="Painel global">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UBadge variant="subtle" color="neutral" icon="i-lucide-calendar">
            Últimos 30 dias
          </UBadge>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <AdminStats />
      <AdminRevenueChart />
      <AdminAtividadeRecente />
    </template>
  </UDashboardPanel>
</template>
