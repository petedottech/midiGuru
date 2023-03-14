<template>
  <div class="p-0.5">
    <div class="midiLabel text-center w-full">
      {{ name }} <button
        v-if="editable"
        class="smaller"
      >
        (Edit)
      </button>
    </div>
    <div class="">
      <div
        class="flex flex-wrap justify-center w-full gap-1"
      > 
        <button 
          v-for="item, index in items"
          :key="index"
          :class="{ 'selected' : selected === index }"
          @click="selected = index"
        >
          {{ items[index].name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMidiLogStore } from '~~/store/midilog';


const midiLog = useMidiLogStore()
const midi = useMidiState();

const emit = defineEmits(['midiOutput', 'update:modelValue'])
const selected = ref(0);

const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true
    },
    ccMsg: {
      type: Number,
      required: true
    }, // should be unsigned byte...
    editable: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
});

watch(() => props.modelValue, (updated, old) => {
  if (updated !== old) {
    // Maybe a direct match isn't the best appoach here... ?
    selected.value = props.items.findIndex((item) => item.value === updated)
  }
});

watch(selected, (selected) => {
  const first = 0xb0 | midi.value.channel - 1;
  if (selected > -1) {
    const msg = [first, props.ccMsg, props.items[selected].value];
    midi.value.output.send(msg); // sends the message.
    midiLog.log(`${props.name} ${props.items[selected].name} (cc value: ${props.items[selected].value}) [${msg}]`);
    emit('midiOutput');
    emit('update:modelValue', props.items[selected].value)
  } else {
    console.log('ERRROR MIDI SELECT$ED -1 in MidiSelect', props.name);
  }
})
</script>