<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <NuxtLink to="/display/todos" class="button mb-4">Back</NuxtLink>
  <h2 class="subtitle">This is TODO id: {{ route.params.id }}</h2>
</template>
