import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from '@/presentation/layouts/App.vue';
import router from '@/application/router';
import store from '@/application/store/';
import '@/application/registerServiceWorker';
import modules from '@/application/modules';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const isAuthorized = store.getters.isAuthorized as boolean;
  const allowAnonymous = !!to.meta.allowAnonymous;

  if (!isAuthorized && !allowAnonymous) {
    next({ name: modules.LoginModule.name });
    return;
  }

  if (isAuthorized && allowAnonymous) {
    next({ name: modules.CourseListModule.name });
    return;
  }

  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
