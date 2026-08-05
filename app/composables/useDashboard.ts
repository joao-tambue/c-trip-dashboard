import { createSharedComposable } from '@vueuse/core'

const _usePainel = () => {
  const route = useRoute()
  const router = useRouter()
  const slideoverNotificacoesAberto = ref(false)

  defineShortcuts({
    'g-h': () => router.push('/'),
    'g-i': () => router.push('/inbox'),
    'g-c': () => router.push('/customers'),
    'g-s': () => router.push('/settings'),
    'n': () => slideoverNotificacoesAberto.value = !slideoverNotificacoesAberto.value
  })

  watch(() => route.fullPath, () => {
    slideoverNotificacoesAberto.value = false
  })

  return {
    slideoverNotificacoesAberto
  }
}

export const usePainel = createSharedComposable(_usePainel)
