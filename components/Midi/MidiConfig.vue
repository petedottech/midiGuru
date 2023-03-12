<template>
  <div
    v-if="midi && midi.outputs.size"
    class="grid md:grid-cols-4 gap-4 grid-flow-row-dense"
  >
    <MidiGroup
      name="MIDI Settings"
      class="col-span-2 settings"
    >
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
              label="Select Midi Port"
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
        <div class="flex flex-row space-x-2 justify-center items-center">
          <div>
            MIDI Output
          </div>
          <div
            class="w-5 h-5 border-4 border-black rounded-full" 
            :class="localBlink ? 'bg-green-700' : 'bg-white'"
          />
        </div>
      </div>
    </MidiGroup>

    <MidiGroup
      name="Patches"
      class="col-span-2 settings"
    >
      <div
        class="flex flex-wrap justify-center w-full gap-1"
      > 
        <button class="btn">
          Save Patch
        </button>
        <button class="btn">
          Load Patch
        </button>
        <button class="btn">
          Initialise Patch
        </button>
        <button class="btn">
          Send Panel
        </button>
      </div>
    </MidiGroup>
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

const midiState = useMidiState();

const midiChannel = ref(1);
const midi = ref(null);
const midiPorts = ref(null);
const midiPort = ref(-1);

const props = defineProps({
  blink: {
    type: Boolean,
    default: false,
  }
});

const localBlink = ref(false);

onNuxtReady(async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess( { sysex: true });

      console.log("MIDI ready!");
      midiState.value.haveAccess = true;
      midi.value = midiAccess;
      midiPorts.value = new Array(...midiAccess.outputs.values());
      midiState.value.channel = midiChannel;

      if (midiPorts.value.length < 1){
        console.log("No midi ports found");
        throw('No midi ports')
      }

    } catch (error) {
      console.log("MIDI access failed!");
      alert("Could not get MIDI access.\n");
    }
});

watch(midiChannel, (channel) => {
  midiState.value.channel = channel;
});

watch(midiPort, (port) => {
  if (port === -1) {
    midiState.value.output = port;
  } else {
    midiState.value.output = midiPorts.value[port]
  }
})

let blinkTimeout = null;

watch(() => props.blink, () => {
  clearTimeout(blinkTimeout);
  localBlink.value = true;
  blinkTimeout = setTimeout(() => {
    localBlink.value = false
  }, 150);
});
</script>