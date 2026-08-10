/**
 * Forma leve para referenciar uma imagem de avatar nos modelos de domínio.
 * Propositadamente mais simples do que `AvatarProps` (@nuxt/ui) — os tipos de
 * domínio não devem depender de tipos de props de componentes de UI, e essa
 * dependência chegou a causar instanciações de tipo excessivamente profundas
 * ao filtrar/copiar listas destes modelos.
 */
export interface AvatarRef {
  src?: string
  alt?: string
}

/** Perfis internos suportados pelo portal C-Trip. */
export type Perfil = 'admin' | 'frota' | 'publicador'

export interface SessaoUtilizador {
  perfil: Perfil
  name: string
  email: string
  cargo: string
  empresa?: string
  avatar?: AvatarRef
}

export interface Cidade {
  id: number
  nome: string
  provincia: string
  pais: string
  activa: boolean
}

export type EstadoEmpresa = 'pendente' | 'verificada' | 'recusada'

export interface Empresa {
  id: number
  nome: string
  nif: string
  cidadeSede: string
  responsavelNome: string
  responsavelEmail: string
  estado: EstadoEmpresa
  dataRegisto: string
  rotasActivas: number
  vendas30d: number
  reclamacoes: number
}

export type EstadoAutocarro = 'disponivel' | 'manutencao'

export interface Autocarro {
  id: number
  matricula: string
  modelo: string
  filas: number
  lugaresPorFila: number
  capacidade: number
  estado: EstadoAutocarro
}

export type DisponibilidadeMotorista = 'disponivel' | 'em_viagem' | 'folga'

export interface Motorista {
  id: number
  name: string
  email: string
  telefone: string
  carta: string
  disponibilidade: DisponibilidadeMotorista
  viagensMes: number
  avatar?: AvatarRef
}

export type PapelEquipa = 'motorista' | 'operador' | 'gestor_rota'

export interface MembroEquipa {
  id: number
  name: string
  email: string
  papel: PapelEquipa
  estado: 'activo' | 'inactivo'
  avatar?: AvatarRef
  dataEntrada: string
}

export type EstadoPresenca = 'presente' | 'atraso' | 'ausente'

export interface Presenca {
  id: number
  funcionarioId: number
  funcionarioNome: string
  departamento: string
  data: string
  horaEntrada?: string
  estado: EstadoPresenca
}

export type EstadoTarefa = 'pendente' | 'em_curso' | 'concluida'
export type PrioridadeTarefa = 'baixa' | 'media' | 'alta'

export interface Tarefa {
  id: number
  titulo: string
  descricao: string
  atribuidoA: string
  prioridade: PrioridadeTarefa
  estado: EstadoTarefa
  prazo: string
}

export interface ParagemRota {
  cidade: string
  precoAcrescido: number
}

export interface Rota {
  id: number
  origem: string
  destino: string
  paragens: ParagemRota[]
  precoBase: number
  distanciaKm: number
  activa: boolean
}

export type EstadoHorario = 'agendado' | 'em_rota' | 'concluido' | 'cancelado'

export interface Horario {
  id: number
  rotaId: number
  data: string
  horaPartida: string
  autocarroId: number
  motoristaId: number
  lugaresTotais: number
  lugaresOcupados: number
  precoBase: number
  estado: EstadoHorario
}

export type EstadoReembolso = 'pendente' | 'aprovado' | 'recusado'

export interface Reembolso {
  id: number
  passageiroNome: string
  passageiroEmail: string
  rota: string
  dataViagem: string
  valor: number
  motivo: string
  estado: EstadoReembolso
  dataPedido: string
}

export interface Passageiro {
  id: number
  name: string
  email: string
  telefone: string
  dataRegisto: string
  totalReservas: number
  ultimaViagem?: string
  estado: 'activo' | 'bloqueado'
  avatar?: AvatarRef
}

export type TipoEventoAuditoria = 'embarque' | 'cancelamento' | 'reembolso' | 'login' | 'aprovacao_empresa'

export interface LogAuditoria {
  id: number
  timestamp: string
  tipo: TipoEventoAuditoria
  actor: string
  empresa?: string
  descricao: string
}

export interface Mensagem {
  id: number
  horarioId: number
  assunto: string
  corpo: string
  dataEnvio: string
  destinatarios: number
}

export interface Estatistica {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Notificacao {
  id: number
  unread?: boolean
  perfil: Perfil
  icon: string
  title: string
  body: string
  date: string
}

export type Periodo = 'diario' | 'semanal' | 'mensal'

export interface Intervalo {
  start: Date
  end: Date
}
