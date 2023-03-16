<template>
  <MidiSetup />
  <div
    v-if="globalStore.getMidiOutput !== -1"
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
      v-for="controller, index in deviceStore.getDevices[deviceStore.getCurrent].controllers"
      :key="index"
      :name="index"
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
        :parent="index"
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
import { ConcreteComponent } from 'vue';
import { useDeviceStore } from '~~/store/devices';
import { useMidiLogStore } from '~~/store/midilog';
import { useGlobalStore } from '~~/store/global';
import { usePatchStore } from '~~/store/patches';

const midiLog = useMidiLogStore()
const globalStore = useGlobalStore()
const patchStore = usePatchStore()
const deviceStore = useDeviceStore();

const route = useRoute();

interface MidiElements {
  name: string;
  value: ConcreteComponent;
}

const midiElements : MidiElements = {
  'MidiRange': resolveComponent('MidiRange'),
  'MidiSelect': resolveComponent('MidiSelect'),
};

const blink = ref(false);

const midiOutput = (midiMessage) => {
  const msg = [
    midiMessage.status | patchStore.getMidiChannel - 1,
    midiMessage.data_one,
    midiMessage.data_two
  ];

  // FIXME: -999 is an ugly hack for demo mode...
  if (globalStore.getMidiOutput.name !== 'Demo') {
    globalStore.getMidiOutput.send(msg); // sends the message.
    midiLog.log(`MIDI Out: [${msg}]`);
  } else {
    midiLog.log(`[DEMO MODE] MIDI Out: [${msg}]`);
  }
  blink.value = !blink.value;
}

onMounted(() => {
  const synth = route.params.name;
  globalStore.setPageTitle(deviceStore.getDevices[synth].name);
  deviceStore.setCurrent(synth);
});

</script>