import Vue from 'vue';
import Notifications from 'vue-notification';
import store from "./store";
import router from "./router";
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Notifications)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
