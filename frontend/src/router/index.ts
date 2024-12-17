import { createRouter, createWebHistory } from 'vue-router';
import VisitorList from '@/components/VisitorList.vue';
import InputName from '@/components/InputName.vue';

const routes = [
  { path: '/', redirect: '/input-name' },
  { path: '/visitor-list', component: VisitorList },
  { path: '/input-name', component: InputName },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
