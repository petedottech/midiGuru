import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: runtimeConfig.gaMeasurementId,
    },
    isEnabled: false,
    useDebugger: process.env.NODE_ENV === 'development',
  });
});
