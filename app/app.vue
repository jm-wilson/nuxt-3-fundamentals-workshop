<script setup lang="ts"></script>

<template>
  <Head>
    <Title>Hello Nuxt</Title>
  </Head>
  <div>
    <NuxtRouteAnnouncer />
    <TheNavbar />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
/* The course says to use @import, but that's deprecated in favor of @use now */
@use './assets/styles/main.scss';
</style>

<style>
.list-none {
  list-style-type: none;
}
</style>
