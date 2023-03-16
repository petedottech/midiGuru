<template>
  <section class="max-w-screen-lg m-auto py-10">
    <h1 class="text-center text-5xl">
      Welcome to <span class="font-semibold"><strong>midi</strong>Guru</span>
    </h1>
    <p class="pt-10">
      Taking inspiration from <NuxtLink to="http://oscillatorsink.com/">
        Oscillator Sink
      </NuxtLink>and his KORG Volca <NuxtLink to="https://synthmata.com/volca-drum/">
        Drum
      </NuxtLink>and <NuxtLink to="https://synthmata.com/volca-fm/">
        FM
      </NuxtLink> patch editors I'm building a
      <NuxtLink to="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API">
        Web MIDI
      </NuxtLink> web app that will allow you to eventually build custom web based MIDI controllers.
    </p>
    <p class="pt-2">
      In the meantime I've build one controller for the excellent <NuxtLink to="/synth/nts-1">
        KORG NTS-1
      </NuxtLink> with the KORG Volca Drum patch editor coming soon.
    </p>
  </section>
  <section class="grid gap-4 grid-cols-2 max-w-screen-lg m-auto">
    <NuxtLink
      to="/synth/nts-1"
      class="box"
    >
      <MidiGroup
        name="&nbsp;"
        class="nts-1 h-40 md:h-32"
      >
        <h2 class="text-center text-lg md:text-2xl">
          KORG NTS-1
        </h2>
      </MidiGroup>
    </NuxtLink>
    <!--NuxtLink
      to="/"
      class="box"
    -->
    <MidiGroup
      name="&nbsp;"
      class="volca-drum h-40 md:h-32"
    >
      <h2 class="text-center text-lg md:text-2xl">
        KORG Volca Drum
      </h2>
    </MidiGroup>
    <!--NuxtLink-->
  </section>
</template>


<script setup lang="ts">
import { useGlobalStore } from '~~/store/global';
const globalStore = useGlobalStore();

onMounted(() => {
  globalStore.pageTitle = ''; 
});

</script>

<style lang="postcss">

a.box {
  @apply no-underline hover:translate-y-0.5;
}
</style>