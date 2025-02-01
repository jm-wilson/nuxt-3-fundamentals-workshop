<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <Title>TODO #{{ route.params.id }} - Hello Nuxt</Title>
  <NuxtLayout name="inner">
    <NuxtLink to="/display/todos" class="button mb-4">Back</NuxtLink>
    <h2 class="subtitle">This is TODO id: {{ route.params.id }}</h2>
  </NuxtLayout>
</template>
