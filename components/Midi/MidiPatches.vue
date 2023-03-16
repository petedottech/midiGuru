<template>
  <MidiGroup
    name="Patches"
    class="settings"
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
        <h1>Current patch: {{ patchStore.getCurrent }}</h1>
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
    <PageModal
      name="Overwrite patch?"
      :show="showSavePatchModal"
    >
      <template #body>
        <div class="text-center">
          This will overwrite the settings in '{{ patchStore.getCurrent }}'
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
  </MidiGroup>
</template>

<script setup>
import { useDeviceStore } from '~~/store/devices';
import { usePatchStore } from '~~/store/patches';

const emit = defineEmits(['midiOutput']);

const patchToLoad = ref(-1);
const newPatchName = ref('');
const deviceStore = useDeviceStore();
const patchStore = usePatchStore();

const showSavePatchModal = ref(false);
const showLoadPatchModal = ref(false);
const showCreatePatchModal = ref(false);

const savePatch = () => {
  patchStore.getPatches[deviceStore.getCurrent][patchStore.getCurrent] = deviceStore.getDevices[deviceStore.getCurrent];
  showSavePatchModal.value = false;
};

const loadPatch = () => {
  patchStore.setCurrent = patchToLoad.value;
  deviceStore.getDevices[deviceStore.getCurrent] = patchStore.getPatches[deviceStore.getCurrent][patchStore.getCurrent]
  showLoadPatchModal.value = false;
};

const createPatch = () => {
  showCreatePatchModal.value = false;
  // Check that the name does't already exits...
  patchStore.getPatches[deviceStore.getCurrent][newPatchName.value] = deviceStore.getDevices[deviceStore.getCurrent];
  patchStore.setCurrent = patchToLoad.value;
  newPatchName.value = '';
};


const sendPanel = () => {
  for (const controller in deviceStore.getDevices[deviceStore.getCurrent]['controllers']) {
    for (const parameter in deviceStore.getDevices[deviceStore.getCurrent]['controllers'][controller]['parameters']) {
      const settings = deviceStore.getDevices[deviceStore.getCurrent]['controllers'][controller]['parameters'][parameter]
      const midiMsg = { status: 0xb0, data_one: settings.cc_msg, data_two: settings.cc_value };
      emit('midiOutput', midiMsg);
    }
  }
};

</script>