<template>
  <div v-show="!cookieConsent">
    <Transition>
      <MidiGroup
        class="page-cookie-consent bg-green-200"
        name="Manage Cookie Consent"
      >
        <div class="flex flex-row items-center h-full">
          <div class="md:w-10/12 pb-4 md:pb-0">
            <slot name="title" />
          </div>
          <div class="text-center w-full md:w-2/12">
            <button
              class="w-24"
              @click="acceptCookies"
            >
              Accept
            </button>
          </div>
        </div>
      </MidiGroup>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useState, trackRouter } from "vue-gtag-next";
const { isEnabled } = useState();

const today = new Date();
today.setFullYear(today.getFullYear() + 1);
const cookieConsent = useCookie('cookie-consent', { expires: today })

const acceptCookies = () => {
  console.log('accept cookies')
  cookieConsent.value = 'true';
  console.log(cookieConsent)
  console.log(isEnabled)
  isEnabled.value = true;
  trackRouter(useRouter())
}
</script>  

<style lang="postcss" scoped>

.page-cookie-consent {
  @apply fixed bottom-0 left-0 h-64 md:h-44 mx-4 flex flex-col items-center;
} 
</style>