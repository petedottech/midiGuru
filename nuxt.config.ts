import eslintPlugin from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  vite: {
    plugins: [eslintPlugin()],
  },
  app: {
    head: {
      title: 'midiGuru',
      charset: 'utf-16',
      /* meta: [
        { name: 'description', content: 'Generic stuff' },
        { name: 'title', content: 'XXX Generic stuff' },
      ], */
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  css: ['@/assets/css/main.css'],
  tailwindcss: {},
  googleFonts: {
    download: true,
    families: {
      // TODO: revisit these and consolodate
      Nunito: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  runtimeConfig: {
    public: {
      gaMeasurementId: process.env.GA_MEASUREMENT_ID,
    },
  },
});
