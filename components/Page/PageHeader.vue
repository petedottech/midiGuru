<template>
  <div class="w-full flex items-center justify-between">
    <div v-if="navState.pageTitle.length">
      <h1 class="text-2xl md:text-5xl font-semibold">
        {{ navState.pageTitle }} 
      </h1>
    </div>
    <div
      v-else
      class="space-x-4"
    >
      <!--NuxtLink to="/about">
        About
      </NuxtLink-->
      <!--NuxtLink to="/nts-1">
        NTS-1
      </NuxtLink-->
    </div>
    <NuxtLink
      to="/"
      class="no-underline"
    >
      <h1 class="text-3xl md:text-5xl font-semibold">
        <strong>midi</strong>Guru
      </h1>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const navState = useNavState();

</script>
