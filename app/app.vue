<script setup lang="ts"></script>

<template>
  <div class="container">
    <NuxtRouteAnnouncer />
    <div class="section columns">
      <img class="column" src="/todo.jpg" alt="An empty notebook on a desk" />
      <p class="column">
        Photo by
        <a
          href="https://unsplash.com/@jeshoots?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >JESHOOTS.COM</a
        >
        on
        <a
          href="https://unsplash.com/photos/an-open-empty-notebook-on-a-white-desk-next-to-an-iphone-and-a-macbook-pUAM5hPaCRI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >Unsplash</a
        >
      </p>
    </div>
    <h1 class="is-size-1">Hello Nuxt</h1>
    <div class="section">
      <TodoViewer />
    </div>
    <div class="section">
      <PhotoGallery />
    </div>
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
