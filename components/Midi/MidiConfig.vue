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

  <div
    v-if="midiPort !== -1"
    class="grid md:grid-cols-4 gap-4 pb-4 grid-flow-row-dense"
  >
    <MidiGroup
      name="MIDI output settings"
      class="col-span-1 settings"
    >
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
              :class="{ 'selected': midiChannel === channel }" 
              @click="midiChannel = channel"
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

    <MidiPatches />
    <MidiLogger />
  </div>
  <div
    v-else
    class="relative p-6 pt-2 pb-2 mb-6 h-full flex justify-center items-center"
  >
    <img
      src="~/assets/nomididin.svg"
    >
  </div>
</template>

<script setup lang="ts">
import { useMidiLogStore } from '~~/store/midilog';

const midiLog = useMidiLogStore();
const midiState = useMidiState();

const midiChannel = ref(1);
const midi = ref(null);
const midiPorts = ref(null);
const midiPort = ref(-1);

const localBlink = ref(false);

const showSetMidiPortModal = ref(false);
const showNoMidiModal = ref(false);

const props = defineProps({
  blink: {
    type: Boolean,
    default: false,
  }
});

const demoMode = () => {
  midiPort.value = -999;
  showNoMidiModal.value = false;
}

onNuxtReady(async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess( { sysex: true });

      midiLog.log("MIDI ready!");
      midiState.value.haveAccess = true;
      midi.value = midiAccess;
      midiPorts.value = new Array(...midiAccess.outputs.values());
      midiState.value.channel = midiChannel;

      if (midiPorts.value.length < 1){
        midiLog.log("No MIDI ports found");
        throw('No midi ports');
      }

      showSetMidiPortModal.value = true;

    } catch (error) {
      midiLog.log("MIDI access failed!");
      showNoMidiModal.value = true;
    }
});

watch(midiChannel, (channel) => {
  midiState.value.channel = channel;
  midiLog.log(`MIDI (global) channel ${channel}`)
});

watch(midiPort, (port) => {
  if (port === -1 || port === -999) {
    midiState.value.output = port;
  } else {
    midiState.value.output = midiPorts.value[port]
    midiLog.log(`MIDI port ${midiPorts.value}`)
    showSetMidiPortModal.value = false;
  }
});

let blinkTimeout = -1;

watch(() => props.blink, () => {
  clearTimeout(blinkTimeout);
  localBlink.value = true;
  blinkTimeout = setTimeout(() => {
    localBlink.value = false
  }, 150);
});

</script>