import VueRouter from 'vue-router';

const routes = [
  {
    name: 'DashboardPage',
    path: '/',
    component: () => import('../views/dashboard.vue'),
    meta: {
      title: 'Company - Dashboard',
    },
    props: true,
  },
  {
    name: 'NotFoundPage',
    path: '*',
    component: () => import('../views/notfound.vue'),
    meta: {
      title: 'Company - Opss. 404',
    },
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
