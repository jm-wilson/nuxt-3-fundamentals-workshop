<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <Title>Photos - Hello Nuxt</Title>
  <div class="container">
    <div class="section">
      <NuxtPage v-if="route.params.id" />
      <PhotoGallery v-else />
    </div>
  </div>
</template>
