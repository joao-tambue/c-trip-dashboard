export function inteiroAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function aleatorioDe<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}

const formatadorMoeda = new Intl.NumberFormat('pt-AO', {
  style: 'currency',
  currency: 'AOA',
  maximumFractionDigits: 0
})

/** Formata um valor em Kwanzas (AOA), a moeda usada em toda a plataforma. */
export function formatarMoedaAOA(valor: number): string {
  return formatadorMoeda.format(valor)
}

const formatadorData = new Intl.DateTimeFormat('pt-AO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

export function formatarData(data: string | Date): string {
  return formatadorData.format(new Date(data))
}

const formatadorDataHora = new Intl.DateTimeFormat('pt-AO', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

export function formatarDataHora(data: string | Date): string {
  return formatadorDataHora.format(new Date(data))
}
