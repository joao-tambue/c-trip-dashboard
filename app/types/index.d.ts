import type { AvatarProps } from '@nuxt/ui'

export type StatusUsuario = 'inscrito' | 'nao_inscrito' | 'rejeitado'
export type StatusVenda = 'pago' | 'falhou' | 'reembolsado'

export interface Usuario {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: StatusUsuario
  location: string
}

export interface Email {
  id: number
  unread?: boolean
  from: Usuario
  subject: string
  body: string
  date: string
}

export interface Membro {
  name: string
  username: string
  role: 'membro' | 'dono'
  avatar: AvatarProps
}

export interface Estatistica {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Venda {
  id: string
  date: string
  status: StatusVenda
  email: string
  amount: number
}

export interface Notificacao {
  id: number
  unread?: boolean
  sender: Usuario
  body: string
  date: string
}

export type Periodo = 'diario' | 'semanal' | 'mensal'

export interface Intervalo {
  start: Date
  end: Date
}
