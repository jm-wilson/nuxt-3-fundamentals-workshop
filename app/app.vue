<script lang="ts">
import { defineNuxtComponent } from '#app';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export default defineNuxtComponent({
  data: () => ({
    todoList: [] as Todo[],
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
  },
  methods: {
    fetchTodoList() {
      fetch('https://jsonplaceholder.typicode.com/todos/').then(async (response) => {
        this.todoList = await response.json();
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
    <button @click="fetchTodoList">Fetch Todos</button>
    <details>
      <summary>All todos</summary>
      <pre>{{ todoList }}</pre>
    </details>

    <p v-if="numCompletedTodos">
      {{ numCompletedTodos }} / {{ numTodoItems }} todos completed ({{ percentageCompletedTodos }}%)
    </p>
    <ul>
      <li v-for="todo in todoList" :key="todo.id">
        <input disabled type="checkbox" :checked="todo.completed" /> {{ todo.title }}
      </li>
    </ul>
  </div>
</template>

<style>
:root {
  color-scheme: light dark;
}
</style>
