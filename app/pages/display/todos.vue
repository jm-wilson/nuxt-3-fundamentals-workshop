<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <div class="container">
    <div class="section">
      <NuxtPage v-if="route.params.id" />
      <TodoGallery v-else />
    </div>
  </div>
</template>
