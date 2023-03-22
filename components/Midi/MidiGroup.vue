<template>
  <div class="midiGroup">
    <div class="bolt top left" />
    <div class="bolt top right" />
    <div class="bolt bottom left" />
    <div class="bolt bottom right" />

    <h2 class="text-xl text-center w-full font-semibold">
      {{ name }}
    </h2>
    <slot />
  </div>
</template>

<script setup lang="ts">

interface Props {
  name?: string;
}

withDefaults(defineProps<Props>(), {
  name: () => 'No name',
});

</script>

<style lang="postcss" scoped>
.bolt {
  @apply border-black w-2 h-2 border-2 bg-black rounded-full;
}

.top {
  @apply absolute top-4;
}

.left {
  @apply absolute left-4;
}

.right {
  @apply absolute right-4;
}

.bottom {
  @apply absolute bottom-4;
}
</style>