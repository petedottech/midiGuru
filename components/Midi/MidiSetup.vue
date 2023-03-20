<template>
  <PageModal
    name="No MIDI available"
    :show="showNoMidiModal"
  >
    <template #body>
      <p class="text-center">
        There are currently no MIDI ports to connect to.  Please make sure that you allow your browser 
        (Chromium based or Firefox, see <NuxtLink to="https://caniuse.com/midi">
          https://caniuse.com/midi
        </NuxtLink>) MIDI permissions for this site and make sure that 
        your MIDI devices are connected to your computer.
      </p>
      <p class="text-center pt-2">
        If you don't have any MIDI devices you can access the demo...
      </p>
    </template>
    <template #footer>
      <div class="flex space-x-4 w-full justify-center">
        <button @click="demoMode">
          Demo mode 
        </button>
      </div>
    </template>
  </PageModal>

  <PageModal
    name="MIDI Port"
    :show="showSetMidiPortModal"
  >
    <template #body>
      <div class="flex flex-col gap-3 p-2">
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs">
            Port
          </div>
          <select
            id="midiOutput"
            v-model="midiOutput"
            name="midiOutput"
          >
            <option
              label="-- Select Midi Port --"
              :value="-1"
              selected
            />
            <option
              v-for="port, index in midiOutputs"
              :key="index"
              :label="port.name"
              :value="index"
            />
          </select>
        </div>
      </div>
    </template>
    <template #footer />
  </PageModal>
</template>

<script setup lang="ts">
import { useMidiLogStore } from '~~/store/midilog';
import { useGlobalStore } from '~~/store/global';
import { usePatchStore } from '~~/store/patches';

const globalStore = useGlobalStore();
const midiLog = useMidiLogStore();
const patchStore = usePatchStore();

const midiOutputs = ref<Array<WebMidi.MIDIOutput>>();
const midiOutput = ref<number>(-1);

const showSetMidiPortModal = ref(false);
const showNoMidiModal = ref(false);

const demoMode = () => {
  globalStore.setIsDemo(true);
  showNoMidiModal.value = false;
}

onNuxtReady(async () => {
    try {
      // FIX the type workaround below...
      const midiAccess: WebMidi.MIDIAccess = await navigator['requestMIDIAccess']( { sysex: true });

      midiLog.log("MIDI ready!");
      globalStore.setMidiAccess(true);
      midiOutputs.value = new Array(...midiAccess.outputs.values());

      if (midiOutputs.value.length < 1){
        midiLog.log("No MIDI ports found");
        throw('No midi ports');
      }

      showSetMidiPortModal.value = true;

    } catch (error) {
      midiLog.log("MIDI access failed!");
      showNoMidiModal.value = true;
    }
});

watch(midiOutput, (port) => {
  if (midiOutputs.value && port !== undefined) {
    globalStore.setMidiOutput(midiOutputs.value[port]);
    
    midiLog.log(`MIDI port ${midiOutputs.value[port].name}`);
    midiLog.log(`MIDI channel ${patchStore.getMidiChannel}`);
    showSetMidiPortModal.value = false;
  }
});

</script>