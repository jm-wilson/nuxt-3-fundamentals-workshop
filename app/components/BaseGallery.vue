<script lang="ts" setup generic="TItem extends {id: string | number}, TMetricsKey extends string">
/** Using this type prevents 'total' from being used as a key */
export type Metrics<TItem> = Record<string, (item: TItem) => boolean> & { total?: never };

type Props = {
  fetchButtonText: string;
  fetchUrl: string;
  metrics: Record<TMetricsKey, (item: TItem) => boolean>;
};
const props = defineProps<Props>();

const list = ref<TItem[]>([]);

const metrics = computed(() => {
  const metrics = list.value.reduce(
    (tracker, item) => {
      for (const key in props.metrics) {
        const success = props.metrics[key](item as TItem);
        if (success) {
          if (tracker[key as TMetricsKey]) {
            tracker[key as TMetricsKey] += 1;
          } else {
            tracker[key as TMetricsKey] = 1;
          }
        }
      }
      return tracker;
    },
    { total: list.value.length } as Record<TMetricsKey | 'total', number>
  );

  // Add zeroes for any empty metrics
  for (const key in props.metrics) {
    if (!metrics[key]) {
      metrics[key] = 0;
    }
  }

  return metrics;
});


onMounted(() => {
  fetch(props.fetchUrl).then(async (response) => {
    list.value = await response.json();
  });
});
</script>

<template>
  <details>
    <summary class="button">Show all data</summary>
    <pre>{{ list }}</pre>
  </details>

  <slot v-if="list.length" name="header" :metrics="metrics">LIST</slot>

  <ul class="grid is-col-min-14">
    <li class="list-none" v-for="item in list.slice(0, 20)" :key="item.id">
      <slot name="list-item" :item="item" />
    </li>
  </ul>
</template>
