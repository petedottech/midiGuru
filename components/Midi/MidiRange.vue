<template>
  <div class="flex flex-col p-0.5">
    <label
      class="midiLabel w-full text-center"
      :for="name.toLowerCase()"
    >{{ name }}</label>
    <input
      :id="name.toLowerCase()"
      type="range"
      min="0"
      max="127"
      :value="modelValue"
      class="slider"
      @input="updateCCValue"
    >
  </div>
</template>

<script setup lang="ts">
import { useMidiLogStore } from '~~/store/midilog';
import { MidiMessage } from '~~/types/types';

const midiLog = useMidiLogStore();

const emit = defineEmits<{
  (e: 'midiOutput', payload: MidiMessage ): void,
  (e: 'update:modelValue', value: number ): void,
}>();

interface Props {
  modelValue: number;
  name: string;
  ccMsg: number;
  parent: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  parent: '',
});

const updateCCValue = (event: Event) => {
  if (event.target) {
    const target = event.target as HTMLInputElement;
    
    const midiMsg: MidiMessage = { status: 0xb0, data_one: props.ccMsg, data_two: parseInt(target.value) };
    midiLog.log(`${props.parent} ${props.name} ${props.ccMsg} ${target.value}`);
    emit('midiOutput', midiMsg);
    emit('update:modelValue', parseInt(target.value));
  }
}

</script>

<style lang="postcss">
input[type=range] {
  height: 26px;
  -webkit-appearance: none;
  appearance: none;
  margin: 0px 0;
  width: 100%;
  background: none; 

  /* fix for FF unable to apply focus style bug  */
  /* border: 1px solid white;  */
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  background: black;
}
input[type=range]::-webkit-slider-thumb {
  /* box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000; */
  height: 20px;
  width: 8px;
  /* border-radius: 20px; */
  /* background: red; */
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7.5px;
  @apply bg-red-800;
}


/* Firefox */

input[type=range]::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: black;
    border: none;
}

input[type=range]::-moz-range-thumb {
    border: none;
    height: 20px;
    width: 8px;
    cursor: pointer;
    border-radius: 0;
    @apply bg-red-800;
}

/*hide the outline behind the border*/
input[type=range]:-moz-focusring{
    outline: 1px solid white;
    outline-offset: -1px;
}

input[type=range]:focus::-moz-range-track {
    background: black;
}






</style>