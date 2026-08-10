import type { Perfil } from '~/types'

export default eventHandler((event) => {
  const query = getQuery(event)
  const perfil = query.perfil as Perfil | undefined

  if (!perfil) {
    return notificacoesSeed
  }

  return notificacoesSeed.filter(notificacao => notificacao.perfil === perfil)
})
