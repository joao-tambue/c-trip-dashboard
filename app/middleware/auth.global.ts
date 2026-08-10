import type { Perfil } from '~/types'
import { configuracoesPerfil } from '~/utils/roleNav'

const PERFIL_POR_PREFIXO: Record<string, Perfil> = {
  admin: 'admin',
  frota: 'frota',
  publicador: 'publicador'
}

const ROTAS_PUBLICAS = ['/login', '/forgot-password', '/reset-password']

export default defineNuxtRouteMiddleware((to) => {
  const { currentUser } = useAuth()

  if (to.path === '/') {
    return currentUser.value
      ? navigateTo(configuracoesPerfil[currentUser.value.perfil].homePath)
      : navigateTo('/login')
  }

  if (ROTAS_PUBLICAS.includes(to.path)) {
    return
  }

  const prefixo = to.path.split('/')[1] ?? ''
  const perfilRequerido = PERFIL_POR_PREFIXO[prefixo]

  if (perfilRequerido) {
    if (!currentUser.value || currentUser.value.perfil !== perfilRequerido) {
      return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
    return
  }

  // Rotas partilhadas por todos os perfis (ex.: /settings/**) só exigem sessão iniciada.
  if (to.path.startsWith('/settings') && !currentUser.value) {
    return navigateTo('/login')
  }
})
