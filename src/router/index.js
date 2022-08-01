import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tic',
    name: 'tic',
    component: () => import(/* webpackChunkName: "about" */ '../views/TicTacTo.vue'),
  },
  {
    path: '/rock',
    name: 'rock',
    component: () => import(/* webpackChunkName: "about" */ '../views/RockScissorPaper.vue'),
  },
  {
    path: '/lotto',
    name: 'lotto',
    component: () => import(/* webpackChunkName: "about" */ '../views/LottoGenerator.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
