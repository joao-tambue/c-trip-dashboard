// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],

  // Regista os componentes pelo nome do ficheiro, sem prefixar pela pasta
  // (ex.: `app/components/frota/AutocarroCard.vue` → `<AutocarroCard>`).
  // Todas as pastas de componentes usam nomes já únicos entre si.
  components: [{
    path: '~/components',
    pathPrefix: false
  }],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
