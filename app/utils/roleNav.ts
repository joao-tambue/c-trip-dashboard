import type { NavigationMenuItem } from '@nuxt/ui'
import type { Perfil } from '~/types'

export interface ConfiguracaoPerfil {
  perfil: Perfil
  label: string
  icon: string
  homePath: string
  links: NavigationMenuItem[][]
}

const linksDefinicoes: NavigationMenuItem = {
  label: 'Definições',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: false,
  type: 'trigger',
  children: [
    { label: 'Geral', to: '/settings', exact: true },
    { label: 'Notificações', to: '/settings/notifications' },
    { label: 'Segurança', to: '/settings/security' }
  ]
}

const linksAjuda: NavigationMenuItem[] = [{
  label: 'Ajuda e suporte',
  icon: 'i-lucide-info',
  to: '#'
}]

export const configuracoesPerfil: Record<Perfil, ConfiguracaoPerfil> = {
  admin: {
    perfil: 'admin',
    label: 'Administração C-Trip',
    icon: 'i-lucide-shield-check',
    homePath: '/admin',
    links: [[
      { label: 'Painel', icon: 'i-lucide-layout-dashboard', to: '/admin', exact: true },
      { label: 'Empresas', icon: 'i-lucide-building-2', to: '/admin/empresas' },
      { label: 'Passageiros', icon: 'i-lucide-users', to: '/admin/passageiros' },
      { label: 'Reembolsos', icon: 'i-lucide-receipt-text', to: '/admin/reembolsos' },
      { label: 'Cidades', icon: 'i-lucide-map-pin', to: '/admin/cidades' },
      { label: 'Auditoria', icon: 'i-lucide-scroll-text', to: '/admin/auditoria' },
      linksDefinicoes
    ], linksAjuda]
  },
  frota: {
    perfil: 'frota',
    label: 'Gestão de Frota e Equipa',
    icon: 'i-lucide-bus',
    homePath: '/frota',
    links: [[
      { label: 'Painel', icon: 'i-lucide-layout-dashboard', to: '/frota', exact: true },
      { label: 'Autocarros', icon: 'i-lucide-bus', to: '/frota/autocarros' },
      { label: 'Motoristas', icon: 'i-lucide-id-card', to: '/frota/motoristas' },
      { label: 'Equipa', icon: 'i-lucide-users', to: '/frota/equipa' },
      { label: 'Presenças', icon: 'i-lucide-calendar-check', to: '/frota/presencas' },
      { label: 'Tarefas', icon: 'i-lucide-clipboard-list', to: '/frota/tarefas' },
      linksDefinicoes
    ], linksAjuda]
  },
  publicador: {
    perfil: 'publicador',
    label: 'Publicação de Rotas',
    icon: 'i-lucide-route',
    homePath: '/publicador',
    links: [[
      { label: 'Painel', icon: 'i-lucide-layout-dashboard', to: '/publicador', exact: true },
      { label: 'Rotas', icon: 'i-lucide-route', to: '/publicador/rotas' },
      { label: 'Horários', icon: 'i-lucide-calendar-clock', to: '/publicador/horarios' },
      { label: 'Mensagens', icon: 'i-lucide-megaphone', to: '/publicador/mensagens' },
      { label: 'Analytics', icon: 'i-lucide-chart-column', to: '/publicador/analytics' },
      linksDefinicoes
    ], linksAjuda]
  }
}
