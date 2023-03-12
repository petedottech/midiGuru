<template>
  <div class="p-2">
    <div class="midiLabel text-center w-full">
      {{ name }}
    </div>
    <div class="pt-1">
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

const midi = useMidiState();
const emit = defineEmits(['midiOutput'])
const selected = ref(0);

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    ccMsg: {
        type: Number,
        required: true
    }, // should be unsigned byte...
    items: {
        type: Array,
        default: () => [],
    }, // should be unsigned byte...
});

watch(selected, (selected) => {
  console.log(props.items[selected])
    const first = 0xb0 | midi.value.channel - 1;
    const msg = [first, props.ccMsg, props.items[selected].value];
    midi.value.output.send(msg); // sends the message.
    emit('midiOutput');
})
</script>