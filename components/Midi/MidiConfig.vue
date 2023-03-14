<template>
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

  <PageModal
    name="Overwrite patch?"
    :show="showSavePatchModal"
  >
    <template #body>
      <div class="text-center">
        This will overwrite the settings in '{{ currentPatch }}'
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 w-full justify-center">
        <button @click="savePatch">
          Save Patch
        </button>
        <button @click="showSavePatchModal = false">
          Cancel 
        </button>
      </div>
    </template>
  </PageModal>

  <PageModal
    name="Load patch"
    :show="showLoadPatchModal"
  >
    <template #body>
      <div class="text-center">
        <select
          id="patch"
          v-model="patchToLoad"
          name="patch"
        >
          <option
            label="-- Select patch --"
            :value="-1"
            selected
          />
          <option
            v-for="patch, index in patchStore.getPatches[deviceStore.getCurrent]"
            :key="index"
            :label="index"
            :value="index"
          />
        </select>
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 w-full justify-center">
        <button @click="loadPatch">
          Load patch
        </button>
        <button @click="showLoadPatchModal = false">
          Cancel 
        </button>
      </div>
    </template>
  </PageModal>

  <PageModal
    name="Create new patch"
    :show="showCreatePatchModal"
  >
    <template #body>
      <div class="text-center">
        <input
          v-model="newPatchName"
          type="text"
        > 
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 w-full justify-center">
        <button @click="createPatch">
          Create Patch
        </button>
        <button @click="showCreatePatchModal = false">
          Cancel 
        </button>
      </div>
    </template>
  </PageModal>

  <div
    v-if="midiPort !== -1"
    class="grid md:grid-cols-4 gap-4 grid-flow-row-dense"
  >
    <MidiGroup
      name="MIDI output settings"
      class="col-span-1 settings"
    >
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

    <MidiGroup
      name="Patches"
      class="col-span-1 settings"
    >
      <div class="flex flex-col gap-3 p-2">
        <div class="flex flex-wrap justify-center w-full gap-1">
          <button
            class="btn"
            @click="showSavePatchModal = true"
          >
            Save Patch
          </button>
          <button
            class="btn"
            @click="showLoadPatchModal = true"
          >
            Load Patch
          </button>
          <button
            class="btn"
            @click="showCreatePatchModal = true"
          >
            Create Patch
          </button>
        </div>
        <div class="flex flex-wrap justify-center w-full gap-1">
          <h1>Current patch: {{ currentPatch }}</h1>
        </div>
        <div class="flex flex-wrap justify-center w-full gap-1">
          <button
            class="btn"
            @click="sendPanel()"
          >
            Send Panel
          </button>
        </div>
      </div>
    </MidiGroup>

    <MidiGroup
      name="MIDI log"
      class="col-span-2 log"
    >
      <div class="overflow-y-scroll h-36 bg-neutral-400 p-4 text-xs font-mono">
        <p
          v-for="message, index in midiLog.messages"
          :key="index"
        >
          {{ message }}
        </p>
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
import { useMidiLogStore } from '~~/store/midilog';
import { useDeviceStore } from '~~/store/devices';
import { usePatchStore } from '~~/store/patches';

const deviceStore = useDeviceStore();
const patchStore = usePatchStore();
const midiLog = useMidiLogStore();
const midiState = useMidiState();

const midiChannel = ref(1);
const midi = ref(null);
const midiPorts = ref(null);
const midiPort = ref(-1);
const currentPatch = ref('Default');
const patchToLoad = ref(-1);
const newPatchName = ref('');

const localBlink = ref(false);

const showSavePatchModal = ref(false);
const showLoadPatchModal = ref(false);
const showCreatePatchModal = ref(false);

const showSetMidiPortModal = ref(true);

const props = defineProps({
  blink: {
    type: Boolean,
    default: false,
  }
});

const savePatch = () => {
  patchStore.getPatches[deviceStore.getCurrent][currentPatch.value] = deviceStore.getDevices[deviceStore.getCurrent];
  showSavePatchModal.value = false;
};

const loadPatch = () => {
  currentPatch.value = patchToLoad.value;
  showLoadPatchModal.value = false;
};

const createPatch = () => {
  showCreatePatchModal.value = false;
  // Check that the name does't already exits...
  patchStore.getPatches[deviceStore.getCurrent][newPatchName.value] = deviceStore.getDevices[deviceStore.getCurrent];
  currentPatch.value = newPatchName.value;
  newPatchName.value = '';
};

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
        throw('No midi ports')
      }

    } catch (error) {
      midiLog.log("MIDI access failed!");
      alert("Could not get MIDI access.\n");
    }
});

watch(midiChannel, (channel) => {
  midiState.value.channel = channel;
  midiLog.log(`MIDI (global) channel ${channel}`)
});

watch(midiPort, (port) => {
  if (port === -1) {
    midiState.value.output = port;
  } else {
    midiState.value.output = midiPorts.value[port]
    midiLog.log(`MIDI port ${midiPorts.value}`)
    showSetMidiPortModal.value = false;
  }
});


watch(currentPatch, (patch) => {
  deviceStore.getDevices[deviceStore.getCurrent] = patchStore.getPatches[deviceStore.getCurrent][patch]
});

const sendPanel = () => {
  for (const controller in deviceStore.getDevices[deviceStore.getCurrent]['controllers']) {
    for (const parameter in deviceStore.getDevices[deviceStore.getCurrent]['controllers'][controller]['parameters']) {
      const settings = deviceStore.getDevices[deviceStore.getCurrent]['controllers'][controller]['parameters'][parameter]
      const first = 0xb0 | midiState.value.channel - 1;
      const msg = [first, settings.cc_msg, settings.cc_value];
      midiState.value.output.send(msg); // sends the message.
    }
  }
};

let blinkTimeout = -1;

watch(() => props.blink, () => {
  clearTimeout(blinkTimeout);
  localBlink.value = true;
  blinkTimeout = setTimeout(() => {
    localBlink.value = false
  }, 150);
});
</script>