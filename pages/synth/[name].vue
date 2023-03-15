<template>
  <MidiConfig
    :blink="blink"
  />
  <div
    v-if="midiState.output !== -1"
    class="grid grid-cols-4 gap-4 grid-flow-row-dense pt-4"
  >
    <MidiGroup
      v-for="controller, index in deviceStore.getDevices[synth].controllers"
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
</template>
  
<script setup lang="ts">
import { ConcreteComponent } from 'vue';
import { useDeviceStore } from '~~/store/devices';
import { useMidiLogStore } from '~~/store/midilog';

const midiLog = useMidiLogStore()
const midi = useMidiState();

const deviceStore = useDeviceStore();
const route = useRoute();
const synth = route.params.name;
deviceStore.setCurrent(synth);

interface MidiElements {
  name: string;
  value: ConcreteComponent;
}

const midiElements : MidiElements = {
  'MidiRange': resolveComponent('MidiRange'),
  'MidiSelect': resolveComponent('MidiSelect'),
};

const midiState = useMidiState();
const navState = useNavState();

const blink = ref(false);

const midiOutput = (midiMessage) => {
  const msg = [
    midiMessage.status | midi.value.channel - 1,
    midiMessage.data_one,
    midiMessage.data_two
  ];

  // FIXME: -999 is an ugly hack for demo mode...
  if (midi.value.output !== -999) {
    midi.value.output.send(msg); // sends the message.
    midiLog.log(`MIDI Out: [${msg}]`);
  } else {
    midiLog.log(`[DEMO MODE] MIDI Out: [${msg}]`);
  }
  blink.value = !blink.value;
}

onMounted(() => {
  navState.value.pageTitle = deviceStore.getDevices[synth].name;
});

</script>