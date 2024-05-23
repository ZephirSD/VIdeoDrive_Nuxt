// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1'
    },
  },
  stripe: {
    server: {
      key: process.env.STRIPE_KEY_PRIVATE
    },
    client: {
      key: process.env.STRIPE_KEY_PUBLIC
    }
  },
  runtimeConfig: {
    sripeKeyP: process.env.STRIPE_KEY_PUBLIC
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  devtools: { enabled: true },
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  fontawesome: {
    icons: {
      solid: ['cart-shopping', 'chevron-right', 'check', 'trash']
    }
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    "@unlok-co/nuxt-stripe",
    '@vue-email/nuxt'
  ]
})
