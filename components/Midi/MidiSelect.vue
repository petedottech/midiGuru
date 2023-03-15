<template>
  <PageModal
    :name="`Add new ${parent} type`"
    :show="showEditMidiSelectModal"
  >
    <template #body>
      <div class="text-center space-y-2">
        <input
          v-for="item, index in items.filter(i => !i.editable)"
          :key="index"
          type="text"
          :value="`[Built in] ${item.name}`"
          disabled
        > 
        <div
          v-for="item, index in localItems"
          :key="index"
          class="flex flex-row gap-2"
        >
          <input
            v-model="localItems[index]"
            type="text"
          > 
          <button @click="removeLocalItem(index)">
            Remove
          </button>
        </div>
        <div class="flex flex-row gap-2">
          <input
            v-model="addedItem"
            type="text"
          > 
          <button @click="addLocalItem()">
            Add
          </button>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 w-full justify-center">
        <button @click="updateItems">
          Save {{ parent }} types
        </button>
        <button @click="showEditMidiSelectModal = false">
          Cancel 
        </button>
      </div>
    </template>
  </PageModal>
  <div class="p-0.5">
    <div class="midiLabel text-center w-full">
      {{ name }} <button
        v-if="editable"
        class="smaller"
        @click="showEditMidiSelectModal = true"
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
const emit = defineEmits(['midiOutput', 'update:modelValue'])
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
    parent: {
        type: String,
        required: true
    },
    items: {
      type: Array,
      default: () => [],
    },
});

const showEditMidiSelectModal = ref(false);
const selected = ref(0);
const localItems = ref([]);
const addedItem = ref('');

localItems.value = [...props.items.filter(i => i.editable).map(i => i.name)];
          // v-for="item, index in localItems.filter(i => i.editable)"

const removeLocalItem = index => {
 console.log(localItems.value)
 localItems.value.splice(index, 1);
 console.log(localItems.value)
}

const addLocalItem = () => {
  localItems.value.push(addedItem.value);
  addedItem.value = '';
}

const updateItems = () => {
  console.log(localItems.value);
  showEditMidiSelectModal.value = false;
}

watch(() => props.modelValue, (updated, old) => {
  if (updated !== old) {
    // Maybe a direct match isn't the best appoach here... ?
    selected.value = props.items.findIndex((item) => item.value === updated)
  }
});

watch(selected, (selected) => {
  if (selected > -1) {
    const midiMsg = { status: 0xb0, data_one: props.ccMsg, data_two: props.items[selected].value };
    midiLog.log(`${props.parent} ${props.name} ${props.items[selected].name} ${props.ccMsg} ${props.items[selected].value}`);
    emit('midiOutput', midiMsg);
    emit('update:modelValue', props.items[selected].value)
  } else {
    console.log('ERRROR MIDI SELECT$ED -1 in MidiSelect', props.name);
  }
})
</script>