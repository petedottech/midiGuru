<template>
  <PageModal
    name="No MIDI available"
    :show="showNoMidiModal"
  >
    <template #body>
      <p class="text-center">
        There are currently no MIDI ports to connect to.  Please make sure that you allow your browser (Chromium based) MIDI permissions for this site and make sure that 
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
            id="midiPort"
            v-model="midiPort"
            name="midiPort"
          >
            <option
              label="-- Select Midi Port --"
              :value="-1"
              selected
            />
            <option
              v-for="port, index in midiPorts"
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

const globalStore = useGlobalStore();
const midiLog = useMidiLogStore();

const midiPorts = ref(null);
const midiPort = ref(-1);

const showSetMidiPortModal = ref(false);
const showNoMidiModal = ref(false);

const demoMode = () => {
  midiPort.value = -999;
  showNoMidiModal.value = false;
}

onNuxtReady(async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess( { sysex: true });

      midiLog.log("MIDI ready!");
      globalStore.setMidiAccess(true);
      midiPorts.value = new Array(...midiAccess.outputs.values());

      if (midiPorts.value.length < 1){
        midiLog.log("No MIDI ports found");
        throw('No midi ports');
      }

      showSetMidiPortModal.value = true;

    } catch (error) {
      console.log(error);
      midiLog.log("MIDI access failed!");
      showNoMidiModal.value = true;
    }
});

watch(midiPort, (port) => {
  if (port === -1 || port === -999) {
    globalStore.setMidiOutput(port);
  } else {
    globalStore.setMidiOutput(midiPorts.value[port]);
    midiLog.log(`MIDI port ${midiPorts.value}`)
    showSetMidiPortModal.value = false;
  }
});

</script>