export function inteiroAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function aleatorioDe<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}
