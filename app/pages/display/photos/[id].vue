<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <NuxtLayout name="inner">
    <NuxtLink to="/display/photos" class="button mb-4">Back</NuxtLink>
    <h2 class="subtitle">This is photo id: {{ route.params.id }}</h2>
  </NuxtLayout>
</template>
