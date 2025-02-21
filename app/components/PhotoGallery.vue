<script lang="ts" setup>
import type { Metrics } from './BaseGallery.vue';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const filters = useQueryFilters<Photo>({
  even: (photo) => photo.albumId % 2 === 0,
});

// `as const` allows keys to be inferred as literals instead of `string`
// `satisfies` gives type checking/inference within this object
const metrics = {
  odd: (photo) => photo.albumId % 2 !== 0,
  even: (photo) => photo.albumId % 2 === 0,
} as const satisfies Metrics<Photo>;
</script>

<template>
  <BaseGallery
    :metrics="metrics"
    :filters="filters"
    fetch-button-text="Get Photos"
    fetch-url="https://jsonplaceholder.typicode.com/photos/"
  >
    <template #header="{ metrics }">
      <span class="is-size-4">
        Photos ({{ metrics.odd }} odd / {{ metrics.even }} even = {{ metrics.total }} total)
      </span>
    </template>

    <template #list-item="{ item: photo }">
      <NuxtLink :to="`/display/photos/${photo.id}`">
        <img :src="photo.thumbnailUrl" :alt="photo.title" />
      </NuxtLink>
    </template>
  </BaseGallery>
</template>
