<template>
  <MidiGroup
    name="MIDI output settings"
    class="settings"
  >
    <div class="flex flex-col justify-center items-center">
      <div class="text-xs">
        Port
      </div>
      <input
        type="text"
        disabled
        :value="globalStore.getMidiOutput.name"
      >
    </div>
    <div class="flex flex-col gap-3 p-2">
      <div class="flex flex-col justify-center items-center">
        <div class="text-xs">
          Channel
        </div>
        <div
          class="flex flex-wrap justify-center w-full gap-1"
        > 
          <button
            v-for="channel in [...Array(16).keys()].map(c => c + 1)"
            :key="channel"
            class="small"
            :class="{ 'selected': patchStore.getMidiChannel === channel }" 
            @click="setMidiChannel(channel)"
          >
            {{ channel }}
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div class="text-xs">
          MIDI output
        </div>
        <div
          class="w-5 h-5 border-4 border-black rounded-full" 
          :class="localBlink ? 'bg-green-700' : 'bg-white'"
        />
      </div>
    </div>
  </MidiGroup>
</template>

<script setup lang="ts">
import { useMidiLogStore } from '~~/store/midilog';
import { usePatchStore } from '~~/store/patches';
import { useGlobalStore } from '~~/store/global';

const globalStore = useGlobalStore();
const patchStore = usePatchStore();
const midiLog = useMidiLogStore();

const props = defineProps({
  blink: {
    type: Boolean,
    default: false,
  }
});

const localBlink = ref(false);

const setMidiChannel = (channel: number) => {
  patchStore.setMidiChannel(channel);
  midiLog.log(`MIDI (global) channel ${channel}`)
}

let blinkTimeout = -1;
watch(() => props.blink, () => {
  clearTimeout(blinkTimeout);
  localBlink.value = true;
  blinkTimeout = setTimeout(() => {
    localBlink.value = false
  }, 150);
});

</script>