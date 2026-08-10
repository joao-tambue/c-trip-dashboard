import { createSharedComposable } from '@vueuse/core'
import type { Perfil, SessaoUtilizador } from '~/types'

/**
 * Contas de demonstração — este é um portal interno sem backend de
 * autenticação real. O login apenas selecciona qual das três sessões fica
 * activa; ver `app/pages/login.vue`.
 */
export const utilizadoresDemo: Record<Perfil, SessaoUtilizador> = {
  admin: {
    perfil: 'admin',
    name: 'Ivandro Kiala',
    email: 'ivandro.kiala@c-trip.africa',
    cargo: 'Administrador C-Trip',
    empresa: 'C-Trip · Plataforma',
    avatar: { src: 'https://i.pravatar.cc/128?u=ivandro.kiala' }
  },
  frota: {
    perfil: 'frota',
    name: 'Domingas Sachipengo',
    email: 'domingas.sachipengo@kwanzaexpresso.co.ao',
    cargo: 'Gestora de Frota e Equipa',
    empresa: 'Kwanza Expresso',
    avatar: { src: 'https://i.pravatar.cc/128?u=domingas.sachipengo' }
  },
  publicador: {
    perfil: 'publicador',
    name: 'Edmilson Necaca',
    email: 'edmilson.necaca@kwanzaexpresso.co.ao',
    cargo: 'Publicador de Rotas',
    empresa: 'Kwanza Expresso',
    avatar: { src: 'https://i.pravatar.cc/128?u=edmilson.necaca' }
  }
}

const _useAuth = () => {
  const currentUser = useCookie<SessaoUtilizador | null>('ctrip_session', {
    default: () => null,
    maxAge: 60 * 60 * 8,
    sameSite: 'lax'
  })

  function login(perfil: Perfil) {
    currentUser.value = utilizadoresDemo[perfil]
  }

  function logout() {
    currentUser.value = null
  }

  return {
    currentUser,
    login,
    logout
  }
}

export const useAuth = createSharedComposable(_useAuth)
