<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

// Access route and router instances
const route = useRoute();
const router = useRouter();

// Check if the current page is the visitor list or the input name page
const isVisitorListPage = computed(() => route.path === '/visitor-list');

// Handle navigation between the pages
const togglePage = () => {
  if (isVisitorListPage.value) {
    router.push('/input-name'); // Navigate to the name input page
  } else {
    router.push('/visitor-list'); // Navigate to the visitor list page
  }
};
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld />

      <router-view></router-view>

      <nav>
        <!-- Dynamic link text based on the current route -->
        <a @click.prevent="togglePage">
          {{ isVisitorListPage ? 'First time?' : 'Visited before?' }}
        </a>
      </nav>

    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
  cursor: pointer;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

nav a:hover {
  text-decoration: underline;
  background: none;
}

</style>
