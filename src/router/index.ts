import Vue from 'vue';
import VueRouter from 'vue-router';
import MyMovies from '@/components/MyMovies.vue';
import Admin from '@/components/Admin.vue';
import ServiceAgent from '@/services/serviceAgent';

const serviceAgent = new ServiceAgent();

Vue.use(VueRouter);

const routes = [
    { path: '/myMovies', component: MyMovies },
    {
        path: '/admin',
        component: Admin,
        beforeEnter: async (to: any, from: any, next: any) => {
            const isUserAdmin = await (await serviceAgent.ValidateAdminRequest()).data;
            if (isUserAdmin) {
                next();
            } else {
                next('/myMovies');
            }
        },
    },
    { path: '/', redirect: '/myMovies' },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
