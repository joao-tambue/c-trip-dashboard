import { createSharedComposable } from '@vueuse/core'

const _usePainel = () => {
  const route = useRoute()
  const slideoverNotificacoesAberto = ref(false)

  defineShortcuts({
    n: () => slideoverNotificacoesAberto.value = !slideoverNotificacoesAberto.value
  })

  watch(() => route.fullPath, () => {
    slideoverNotificacoesAberto.value = false
  })

  return {
    slideoverNotificacoesAberto
  }
}

export const usePainel = createSharedComposable(_usePainel)
