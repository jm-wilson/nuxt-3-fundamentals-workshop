<script lang="ts" setup>
import type { Metrics } from './BaseGallery.vue';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const filters = useQueryFilters<Todo>({
  completed: (todo) => todo.completed,
});

// `as const` allows keys to be inferred as literals instead of `string`
// `satisfies` gives type checking/inference within this object
const metrics = {
  completed: (todo) => todo.completed,
} as const satisfies Metrics<Todo>;
</script>

<template>
  <BaseGallery
    :metrics="metrics"
    :filters="filters"
    fetch-button-text="Get TODOs"
    fetch-url="https://jsonplaceholder.typicode.com/todos/"
  >
    <template #header="{ metrics }">
      <span class="is-size-4"> TODOs ({{ metrics.completed }} / {{ metrics.total }}) </span>
    </template>

    <template #list-item="{ item: todo }">
      <input disabled type="checkbox" :checked="todo.completed" />
      <NuxtLink :to="`/display/todos/${todo.id}`">{{ todo.title }}</NuxtLink>
    </template>
  </BaseGallery>
</template>
