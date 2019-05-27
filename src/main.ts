import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const isAuthorized = store.getters.isAuthorized as boolean;
  const allowAnonymous = !!to.meta.allowAnonymous;

  if (!isAuthorized && !allowAnonymous) {
    next('login');
    return;
  }

  if (isAuthorized && allowAnonymous) {
    next({ name: 'default' });
    return;
  }

  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
