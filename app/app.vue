<script setup lang="ts">
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const todoList = ref<Todo[]>([]);
const numTodoItems = computed(() => {
  return todoList.value.length;
});
const numCompletedTodos = computed(() => {
  return todoList.value.filter((todo) => todo.completed).length;
});
const percentageCompletedTodos = computed(() => {
  return Math.round((numCompletedTodos.value / numTodoItems.value) * 100);
});

function fetchTodoList() {
  fetch('https://jsonplaceholder.typicode.com/todos/').then(async (response) => {
    todoList.value = await response.json();
  });
}

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
      <details>
        <summary>TODOS</summary>
        <button @click="fetchTodoList">Fetch Todos</button>
        <details>
          <summary>All todos</summary>
          <pre>{{ todoList }}</pre>
        </details>

        <p v-if="numCompletedTodos">
          {{ numCompletedTodos }} / {{ numTodoItems }} todos completed ({{
            percentageCompletedTodos
          }}%)
        </p>
        <ul class="grid is-col-min-14">
          <li class="list-none" v-for="todo in todoList.slice(0, 20)" :key="todo.id">
            <input disabled type="checkbox" :checked="todo.completed" /> {{ todo.title }}
          </li>
        </ul>
      </details>
    </div>
    <div class="section">
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
    </div>
  </div>
</template>

<style lang="scss">
/* The course says to use @import, but that's deprecated in favor of @use now */
@use './assets/styles/main.scss';
</style>

<style scoped>
.list-none {
  list-style-type: none;
}

.mw-300 {
  min-width: 300px;
}
</style>
