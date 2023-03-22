
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
// import { trackRouter } from "vue-gtag-next";
const { isEnabled } = useState();
const cookieConsent = useCookie('cookie-consent');

if (cookieConsent.value) {
  isEnabled.value = true;
  trackRouter(useRouter())
}

useHead({
  htmlAttrs: {
    lang: 'en',
  },
});

useServerSeoMeta({
  title: 'A web based MIDI Controller and patch editor | midiGuru',
  ogTitle: 'A web based MIDI Controller and patch editor | midiGuru',
  description: 'A web based MIDI Controller and patch editor, currently supporting the Korg NTS-1 and with more synths and a no-code builder coming soon',
  ogDescription: 'A web based MIDI Controller and patch editor, currently supporting the Korg NTS-1 and with more synths and a no-code builder coming soon',
  ogImage: 'https://midi.guru/favicon.ico',
  ogType: 'website',
  ogUrl: 'https://midi.guru',
  twitterCard: 'summary_large_image',
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
  @apply bg-gray-50 border-4 border-black text-gray-900 text-xs
  block w-full p-1
  focus:ring-white focus:border-4 focus:border-black
  ;
}

input[type=text] {
  @apply bg-gray-50 border-4 border-black text-gray-900 text-xs 
  block w-full p-1
  focus:ring-white focus:border-4 focus:border-black
  ;
}

input[type=text]:disabled {
  @apply bg-neutral-400;
}

button {
  @apply bg-red-800 border-4 border-black w-24 h-8 text-xxs text-white 
    hover:bg-red-700 hover:border-neutral-800 hover:translate-y-0.5 hover:font-semibold
    disabled:bg-neutral-400;
}


button.small {
  @apply w-9;
}

button.smaller {
  @apply border-0 w-auto h-auto underline bg-inherit text-black hover:no-underline font-semibold;
}

button.selected {
  @apply bg-red-600 translate-y-0.5 font-semibold;
}

.midiGroup {
  @apply relative px-6 pt-0 pb-8 border-4 border-black;
}

.midiGroup.nts-1 {
  @apply bg-yellow-400;
}

.midiGroup.volca-drum {
  @apply bg-white;
}

.midiGroup.settings {
  @apply bg-neutral-300;
}

.midiGroup.log {
  @apply bg-neutral-400;
}

.midiGroup.footer {
  @apply bg-neutral-200;
}

a {
  @apply underline hover:no-underline;
}


.midiGroup.span-1 {
  @apply col-span-4 md:col-span-2 xl:col-span-1;
}

.midiGroup.span-2 {
  @apply col-span-4 md:col-span-4 xl:col-span-2;
}

.midiGroup.span-3 {
  @apply col-span-4 md:col-span-4 xl:col-span-3;
}

.midiGroup.span-4 {
  @apply col-span-4 md:col-span-4;
}
</style>
