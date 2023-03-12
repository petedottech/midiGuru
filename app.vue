
<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#2597e0" />
      <NuxtPage />
    </NuxtLayout>
    <PageCookieConsent>
      <template #title>
        <p class="text-xs">
          We use technologies like cookies to store and/or access device information. We do this to improve browsing experience and to show personalized ads. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. Not consenting or withdrawing consent, may adversely affect certain features and functions.
        </p>
        <NuxtLink
          class="text-xs"
          to="/privacy"
        >
          Privacy Policy
        </NuxtLink>
      </template>
    </PageCookieConsent>
  </div>
</template>

<script setup lang="ts">
import { useState, trackRouter } from "vue-gtag-next";
const { isEnabled } = useState();
const cookieConsent = useCookie('cookie-consent');

if (cookieConsent.value) {
  isEnabled.value = true;
  trackRouter(useRouter())
}

useHead({
  htmlAttrs: {
    lang: 'en',
  }
});
</script>

<style lang="postcss">
body {
  @apply font-light;
  @apply bg-white text-gray-800;
}

h1 {
  @apply text-2xl font-light;
}

.midiLabel {
  @apply text-xs;
}

select {
  @apply bg-gray-50 border-4 border-black text-gray-900 text-sm 
  block w-full p-1 text-xs
  focus:ring-white focus:border-4 focus:border-black
  ;
}

button {
  @apply bg-red-800 border-4 border-black w-24 h-8 text-xxs text-white 
    hover:bg-red-700 hover:border-neutral-800 hover:translate-y-0.5 hover:font-semibold;
}

button.small {
  @apply w-9;
}

button.selected {
  @apply bg-red-600 translate-y-0.5 font-semibold;
}

.midiGroup {
  @apply relative p-6 pt-2 pb-2 mb-6 h-full border-4 border-black;
}

.midiGroup.nts-1 {
  @apply bg-yellow-400;
}

.midiGroup.volca-drum {
  @apply bg-white;
}

.midiGroup.settings {
  @apply bg-neutral-400;
}

.midiGroup.footer {
  @apply bg-neutral-200;
}

a {
  @apply underline hover:no-underline;
}
</style>
