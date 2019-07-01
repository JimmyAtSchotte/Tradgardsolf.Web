import Vue from 'vue';
import Router from 'vue-router';
import layouts from '@/presentation/layouts';
import modules from '@/presentation/modules';

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/login',
          component: layouts.UnauthenticatedLayout,
          children: [
             { path: '', name: modules.LoginModule.name, component: modules.LoginModule, meta: { allowAnonymous: true } },
             { path: 'create', name: modules.CreatePlayerModule.name, component: modules.CreatePlayerModule, meta: { allowAnonymous: true }  },
          ],
      },
      {
          path: '/',
          component: layouts.AuthenticatedLayout,
          children: [
                {
                    path: '',
                    name: modules.CourseListModule.name,
                    component: modules.CourseListModule,
                },
               {
                    path: 'RoundSetup',
                    name: modules.RoundSetupModule.name,
                    component: modules.RoundSetupModule
                },
                {
                    path: 'Play',
                    name: modules.PlayModule.name,
                    component: modules.PlayModule,
                },
          ],
      },
  ],
});
