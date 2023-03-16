<template>
  <div class="w-full flex items-center justify-between">
    <div class="flex justify-center items-center space-x-4">
      <div
        v-if="globalStore.getPageTitle.length"
      >
        <h1 class="text-2xl md:text-5xl font-semibold">
          {{ globalStore.getPageTitle }} 
        </h1>
      </div>
      <div
        v-else
        class="space-x-4"
      >
        <img
          class="h-8 md:h-12"
          src="~/assets/mididin.svg"
        >
      </div>
      <a
        href="https://www.buymeacoffee.com/petedottech"
        target="_blank"
        class="hidden md:block"
      ><img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style="height: 60px !important;width: 217px !important;"
      ></a>
    </div>
    <NuxtLink
      to="/"
      class="no-underline"
    >
      <h1 class="text-3xl md:text-5xl font-semibold">
        <strong>midi</strong>Guru
      </h1>
    </NuxtLink>
  </div>
  <div class="w-full flex justify-center pt-4">
    <a
      href="https://www.buymeacoffee.com/petedottech"
      target="_blank"
      class="md:hidden"
    ><img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      alt="Buy Me A Coffee"
      style="height: 60px !important;width: 217px !important;"
    ></a>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~~/store/global';
const globalStore = useGlobalStore();
</script>
