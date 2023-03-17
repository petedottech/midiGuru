<template>
  <MidiSetup />
  <div
    v-if="globalStore.getMidiOutput || globalStore.isDemo"
    class="grid grid-cols-4 gap-4 grid-flow-row-dense"
  >
    <MidiConfig
      :blink="blink"
      class="span-1"
    />
    <MidiPatches
      class="span-1"
      @midi-output="midiOutput"
    />
    <MidiLogger class="span-2" />
    <MidiGroup
      v-for="(controller, key, index) in deviceStore.getDevices[deviceStore.getCurrent].controllers"
      :key="index"
      :name="key"
      class="nts-1"
      :class="controller.width"
    >
      <component
        :is="midiElements[parameter.type]"
        v-for="parameter, index1 in controller.parameters"
        :key="index1"
        v-model="parameter.cc_value"
        :name="index1"
        :cc-msg="parameter.cc_msg"
        :items="parameter.type === 'MidiSelect' ? parameter.items : []"
        :editable="parameter.type === 'MidiSelect' ? parameter.editable : false"
        :parent="key"
        @midi-output="midiOutput"
      />
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
import { useDeviceStore } from '~~/store/devices';
import { useMidiLogStore } from '~~/store/midilog';
import { useGlobalStore } from '~~/store/global';
import { usePatchStore } from '~~/store/patches';

const midiLog = useMidiLogStore()
const globalStore = useGlobalStore()
const patchStore = usePatchStore()
const deviceStore = useDeviceStore();

const route = useRoute();

const midiElements = {
  'MidiRange': resolveComponent('MidiRange'),
  'MidiSelect': resolveComponent('MidiSelect'),
};

const blink = ref(false);

interface MidiMessage {
  status: number;
  data_one: number;
  data_two: number;
}

const midiOutput = (midiMessage: MidiMessage) => {
  const msg = [
    midiMessage.status | patchStore.getMidiChannel - 1,
    midiMessage.data_one,
    midiMessage.data_two
  ];

  if (globalStore.getMidiOutput) {
    globalStore.getMidiOutput.send(msg); // sends the message.
    midiLog.log(`MIDI Out: [${msg}]`);
  } else {
    midiLog.log(`[DEMO MODE] MIDI Out: [${msg}]`);
  }
  blink.value = !blink.value;
}

onBeforeMount(() => {
  const synth = route.params.name as string;
  deviceStore.setCurrent(synth);

  globalStore.setPageTitle(deviceStore.getDevices[synth].name);
});

</script>