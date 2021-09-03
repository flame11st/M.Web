import Vue from 'vue';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Main from './components/Main.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(Main),
    vuetify,
    router,
    store,
    methods: {
        setUserIdentity() {
            store.dispatch('setUserIdentity');
        },
    },
    created() {
        this.setUserIdentity();
    },
}).$mount('#main');
