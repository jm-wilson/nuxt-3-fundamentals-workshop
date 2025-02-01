<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <Head>
    <Title>Photo #{{ route.params.id }} - Hello Nuxt</Title>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <Link
      href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap"
      rel="stylesheet"
    />
  </Head>
  <NuxtLayout name="inner">
    <NuxtLink to="/display/photos" class="button mb-4">Back</NuxtLink>
    <h2 class="subtitle cursive">This is photo id: {{ route.params.id }}</h2>
  </NuxtLayout>
</template>

<style scoped>
.cursive {
  font-family: Parisienne;
}
</style>
