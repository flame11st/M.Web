import Vue from 'vue'
import Main from './Components/Main.vue'
import MovieRecommendations from './Components/MovieRecommendations/MovieRecommendations.vue'
import MyMovies from './Components/MyMovies/MyMovies.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/recommendations', component: MovieRecommendations },
  { path: '/myMovies', component: MyMovies },
  { path: '/', redirect: '/recommendations'  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  el: '#Main',
  render: h => h(Main),
  router
})
