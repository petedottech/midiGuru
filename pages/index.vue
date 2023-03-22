<template>
  <section class="max-w-screen-lg m-auto pb-10 md:pt-10 text-center">
    <h1 class="text-3xl md:text-5xl">
      A web based MIDI controller and patch editor
    </h1>
    <p class="pt-10">
      Taking inspiration from <NuxtLink to="http://oscillatorsink.com/">Oscillator Sink</NuxtLink>
      and his KORG Volca <NuxtLink to="https://synthmata.com/volca-drum/">Drum</NuxtLink>
      and
      <NuxtLink to="https://synthmata.com/volca-fm/">FM</NuxtLink>
      patch editors I'm building a
      <NuxtLink to="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API">Web MIDI</NuxtLink>
      web based MIDI Controller and patch editor with a no-code custom controller builder coming in the future.
    </p>
    <p class="pt-2">
      In the meantime I've build a controller and patch editor for the excellent <NuxtLink to="/synth/nts-1">KORG NTS-1</NuxtLink> with the KORG Volca Drum patch editor coming soon.
    </p>
  </section>
  <section class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-screen-lg m-auto">
    <NuxtLink
      to="/synth/nts-1"
      class="box"
    >
      <MidiGroup
        name="KORG NTS-1"
        class="nts-1"
      >
        <div class="mt-4 flex items-center justify-center">
          <img
            width="300"
            height="200"
            src="~/assets/korg-nts-1.svg"
            alt="Korg NTS-1"
          >
        </div>
      </MidiGroup>
    </NuxtLink>
    <!--NuxtLink
      to="/"
      class="box"
    -->
    <MidiGroup
      name="KORG Volca Drum"
      class="volca-drum"
    >
      <div class="mt-4 flex items-center justify-center">
        <img
          width="300"
          height="200"
          src="~/assets/korg-volca-drum.svg"
          alt="Korg Volca Drum"
        >
        <div class="absolute flex justify-center items-center w-full h-full text-white font-bold text-2xl md:text-5xl opacity-0 hover:opacity-100">
          Coming soon
        </div>
      </div>

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