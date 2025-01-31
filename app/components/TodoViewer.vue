<script lang="ts" setup>
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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
  fetch("https://jsonplaceholder.typicode.com/todos/").then(
    async (response) => {
      todoList.value = await response.json();
    }
  );
}
</script>

<template>
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
      <li
        class="list-none"
        v-for="todo in todoList.slice(0, 20)"
        :key="todo.id"
      >
        <input disabled type="checkbox" :checked="todo.completed" />
        {{ todo.title }}
      </li>
    </ul>
  </details>
</template>
