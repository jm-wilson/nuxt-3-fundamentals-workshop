<script lang="ts" setup>
type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const photoList = ref<Photo[]>([]);
const numPhotos = computed(() => {
  return photoList.value.length;
});
const numOddAlbums = computed(() => {
  return photoList.value.filter((photo) => photo.albumId % 2 !== 0).length;
});
const numEvenAlbums = computed(() => {
  return photoList.value.filter((photo) => photo.albumId % 2 === 0).length;
});
const percentageEvenAlbums = computed(() => {
  return Math.round((numEvenAlbums.value / numPhotos.value) * 100);
});

function fetchPhotoList() {
  fetch('https://jsonplaceholder.typicode.com/photos/').then(async (response) => {
    photoList.value = await response.json();
  });
}
</script>

<template>
  <details>
    <summary>PHOTOS</summary>
    <button @click="fetchPhotoList">Fetch photos</button>
    <p v-if="numPhotos">
      {{ numPhotos }} photos total ({{ numOddAlbums }} odd, {{ numEvenAlbums }} even ({{
        percentageEvenAlbums
      }}%))
    </p>
    <div class="fixed-grid has-5-cols">
      <ul class="grid">
        <li class="list-none" v-for="photo in photoList.slice(0, 10)" :key="photo.id">
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </li>
      </ul>
    </div>
  </details>
</template>
