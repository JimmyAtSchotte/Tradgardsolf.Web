import Vue from 'vue';
import Router from 'vue-router';
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue';
import UnauthenticatedLayout from './layouts/UnauthenticatedLayout.vue';
import LoginView from './modules/login/Login.vue';
import CreatePlayerView from './modules/login/CreatePlayer.vue';
import CourseListView from './modules/courseList/CourseList.vue';

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/login',
          component: UnauthenticatedLayout,
          children: [
             { path: '', name: 'login', component: LoginView, meta: { allowAnonymous: true } },
             { path: 'create', name: 'createPlayer', component: CreatePlayerView, meta: { allowAnonymous: true }  },
          ]
      },
      {
          path: '/',
          component: AuthenticatedLayout,
          children: [
               { path: '', name: 'default', component: CourseListView },
              //  { path: 'dashboard', name: 'dashboard', component: Dashboard },
              //  { path: 'translate', name: 'translate', component: Translate }
          ]
      },
  ],
});

