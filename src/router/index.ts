import Vue from 'vue';
import VueRouter from 'vue-router';
import MyMovies from '@/components/MyMovies.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/myMovies', component: MyMovies },
    { path: '/', redirect: '/myMovies' },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
