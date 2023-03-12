<template>
  <div class="grid-container">
    <!--HelperResponsive /-->
    <header class="app-header">
      <PageHeader>
        <!--strong>KORG</!--strong> NTS1-->
      </PageHeader>
    </header>
  
    <div class="app-content">
      <slot />
    </div>
  
    <div class="app-footer">
      <PageFooter />
    </div>
  </div>
</template>
  
<script setup lang="ts">
  // const route = useRoute();
  /* 
  const { defaultSeo, favicon, siteName } = await getGlobal();
  const fullSeo = {
    ...defaultSeo,
  };
  useHead(buildMetaTags(siteName, fullSeo, favicon.data.attributes.url, route.fullPath));
  */
</script>
  
<style lang="postcss" scoped>

.grid-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
  .app-header {
      @apply w-full p-6;
  }
  
  .app-footer {
      @apply w-full p-6;
  }
  
  .app-content {
      @apply px-6 w-full;
  }
  
</style>