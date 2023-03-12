<template>
  <div class="flex flex-col p-2">
    <label
      class="midiLabel w-full text-center"
      :for="name.toLowerCase()"
    >{{ name }}</label>
    <input
      :id="name.toLowerCase()"
      type="range"
      min="0"
      max="127"
      :value="ccValueDefault"
      class="slider"
      @input="updateCCValue"
    >
  </div>
</template>

<script setup lang="ts">

const midi = useMidiState();
const emit = defineEmits(['midiOutput'])

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    ccMsg: {
        type: Number,
        required: true
    }, // should be unsigned byte...
    ccValueDefault: {
        type: Number,
        default: 0,
    }, // should be unsigned byte...
});

const updateCCValue = (event: Event) => {
  if (event.target) {
    const target = event.target as HTMLInputElement;
    const first = 0xb0 | midi.value.channel - 1;
    const msg = [first, props.ccMsg, target.value];
    midi.value.output.send(msg); // sends the message.
    emit('midiOutput');
  }
}

</script>

<style lang="postcss">
input[type=range] {
  height: 26px;
  -webkit-appearance: none;
  margin: 0px 0;
  width: 100%;
  background: none; 
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
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
</style>