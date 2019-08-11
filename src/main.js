// jshint esversion : 6
import VueSocketIo from 'vue-socket.io';
import VueResouce from 'vue-resource';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { url } from './utils/config';


Vue.config.productionTip = false;

// Socket configuration
Vue.use(new VueSocketIo({
  debug: true,
  connection: `${url}/video-chat`,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}));

// Vue resource for Http
Vue.use(VueResouce);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
