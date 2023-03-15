
<template>
  <MidiGroup
    name="MIDI log"
    class="col-span-2 settings"
  >
    <div
      id="scroll"
      ref="scroll"
      class="overflow-y-scroll h-64 bg-neutral-200 px-4 py-2 border-4 border-black text-xs text-black font-mono"
    >
      <p
        v-for="message, index in midiLog.messages"
        :key="index"
      >
        {{ message }}
      </p>
      <div id="scroll-anchor" />
    </div>
  </MidiGroup>
</template>

<script setup lang="ts">

import { useMidiLogStore } from '~~/store/midilog';
const midiLog = useMidiLogStore();

</script>

<style scoped>

#scroll * {
  overflow-anchor: none;
}

#scroll-anchor {
  overflow-anchor: auto;
  height: 1px;
}

</style>