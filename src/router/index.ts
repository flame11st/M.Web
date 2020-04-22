import Vue from 'vue';
import VueRouter from 'vue-router';
import MovieRecommendations from '@/components/MovieRecommendations.vue';
import MyMovies from '@/components/MyMovies.vue';
import Login from '@/components/identity/login/Login.vue';
import SignUp from '@/components/identity/signUp/SignUp.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/recommendations', component: MovieRecommendations },
    { path: '/myMovies', component: MyMovies },
    { path: '/', redirect: '/myMovies' },
    { path: '/login', component: Login },
    { path: '/signUp', component: SignUp },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
