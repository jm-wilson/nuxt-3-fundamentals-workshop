<script lang="ts" setup>
interface NavItem {
  text: string;
  path: string;
  children?: Omit<NavItem, 'children'>[];
}
const navItems = [
  { text: 'Home', path: '/' },
  {
    text: 'Display',
    path: '/display',
    children: [
      { text: 'Photos', path: '/display/photos' },
      { text: 'TODOs', path: '/display/todos' },
    ],
  },
] satisfies NavItem[];
</script>

<template>
  <nav class="navbar">
    <div class="navbar-end mr-4">
      <div
        v-for="navItem in navItems"
        :to="navItem.path"
        class="navbar-item"
        :class="navItem.children?.length ? 'has-dropdown is-hoverable' : ''"
      >
        <template v-if="navItem.children?.length">
          <NuxtLink :to="navItem.path" class="navbar-link">
            {{ navItem.text }}
          </NuxtLink>
          <div class="navbar-dropdown">
            <NuxtLink
              v-for="childItem in navItem.children"
              :to="childItem.path"
              class="navbar-item"
            >
              {{ childItem.text }}
            </NuxtLink>
          </div>
        </template>
        <NuxtLink v-else :to="navItem.path" class="navbar-item">
          {{ navItem.text }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
