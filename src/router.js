import Vue from 'vue';
import Router from 'vue-router';
import VueMaterial from 'vue-material';
import Home from './views/Home.vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import store from './store';

Vue.use(Router);
Vue.use(VueMaterial);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        // eslint-disable-next-line no-unused-expressions
        store.state.room && store.state.username ? next('/chat') : next();
      },
    },
    {
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
