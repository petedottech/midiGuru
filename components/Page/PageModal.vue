<template>
  <Transition>
    <div
      v-if="props.show"
      class="h-screen w-screen bg-opacity-40 bg-neutral-800 fixed top-0 left-0 z-50 flex justify-center items-center"
    >
      <!-- Hack cause currently MidiGroup has 100% height... -->
      <div>
        <MidiGroup
          class="bg-red-500 mx-2 max-w-xl"
          :name="props.name"
        >
          <div class="flex flex-col h-full justify-between pb-4 space-y-6 pt-4">
            <div>
              <slot name="body" />
            </div>
            <div>
              <slot name="footer" />
            </div>
          </div>
        </MidiGroup>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">

interface Props {
  show: boolean;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  name: 'title',
});

</script>  

<style lang="postcss" scoped>
</style>