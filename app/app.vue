<script lang="ts">
import { defineNuxtComponent } from '#app';

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

export default defineNuxtComponent({
  data: () => ({
    todoList: [] as Todo[],
    photoList: [] as Photo[],
  }),
  computed: {
    numTodoItems() {
      return this.todoList.length;
    },
    numCompletedTodos() {
      return this.todoList.filter((todo) => todo.completed).length;
    },
    percentageCompletedTodos() {
      return Math.round((this.numCompletedTodos / this.numTodoItems) * 100);
    },
    numPhotos() {
      return this.photoList.length;
    },
    numOddAlbums() {
      return this.photoList.filter((photo) => photo.albumId % 2 !== 0).length;
    },
    numEvenAlbums() {
      return this.photoList.filter((photo) => photo.albumId % 2 === 0).length;
    },
    percentageEvenAlbums() {
      return Math.round((this.numEvenAlbums / this.numPhotos) * 100);
    },
  },
  methods: {
    fetchTodoList() {
      fetch('https://jsonplaceholder.typicode.com/todos/').then(async (response) => {
        this.todoList = await response.json();
      });
    },
    fetchPhotoList() {
      fetch('https://jsonplaceholder.typicode.com/photos/').then(async (response) => {
        this.photoList = await response.json();
      });
    },
  },
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <img src="/todo.jpg" alt="An empty notebook on a desk" />
    <p>
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
    <h1>Hello Nuxt</h1>
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
      <ul>
        <li v-for="todo in todoList" :key="todo.id">
          <input disabled type="checkbox" :checked="todo.completed" /> {{ todo.title }}
        </li>
      </ul>
    </details>

    <details>
      <summary>PHOTOS</summary>
      <button @click="fetchPhotoList">Fetch photos</button>
      <p v-if="numPhotos">
        {{ numPhotos }} photos total ({{ numOddAlbums }} odd, {{ numEvenAlbums }} even ({{
          percentageEvenAlbums
        }}%))
      </p>
      <ul class="photos">
        <li v-for="photo in photoList.slice(0, 10)" :key="photo.id">
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </li>
      </ul>
    </details>
  </div>
</template>

<style>
:root {
  color-scheme: light dark;
}
</style>

<style scoped>
summary {
  border: 1px solid #333;
  padding: 0.5em;
  margin: 0.5em;
  display: inline-block;
}

.photos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  li {
    list-style: none;
  }
}
</style>
