import '@babel/polyfill';
import Vue, { VueConstructor } from 'vue';
import { ComponentOptions } from 'vue/types';
import './plugins/vuetify';
import '@/application/registerServiceWorker';
import Router, { RouterOptions } from 'vue-router';
// import VueGeolocation from 'vue-browser-geolocation';
import router from '@/application/router';
import store from '@/application/store/';
import layouts from '@/presentation/layouts';
import modules from '@/presentation/modules';
import IStartup from '@/core/interfaces/IStartup';
import Dictionary from '@/core/types/Dictionary';
import Login from '@/core/modules/Login';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';



export default class Startup implements IStartup {
    private readonly options: ComponentOptions<Vue>;
    private readonly components: Dictionary<any>;
    private readonly modules: Dictionary<any>;
    private readonly router: Router;

    constructor() {
        this.options = {};
        this.router = new Router();
        this.components = new Dictionary<any>();
        this.modules = new Dictionary<any>();
    }

    configureServices(): void {

    }

    configureModules(): void {
        this.options.components = { };        
        //const component = this.createComponent('login', modules.LoginModule, new Login());


        const code = Object.assign(Vue.extend(), new Login());
        const component = modules.LoginModule.extend({
            mixins: [code],
        });

        console.log('component', component);

        this.options.components['login'] = component;

        this.router.addRoutes([{
            path: '/login',
            component: layouts.UnauthenticatedLayout,
            children: [
               { path: '', name: modules.LoginModule.name, component: this.options.components['login'] as VueConstructor<Vue>, meta: { allowAnonymous: true } },
               { path: 'create', name: modules.CreatePlayerModule.name, component: modules.CreatePlayerModule, meta: { allowAnonymous: true }  },
            ],
        }]);
    }

    configureComponents(): void {

    }

    public run(): void {
        Vue.config.productionTip = false;

        router.beforeEach((to, from, next) => {
            const isAuthorized = store.current.getters.isAuthorized as boolean;
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

        this.options.router = router;
        this.options.store = store.current;
        this.options.render = (h) => h(layouts.App);

        var vm = new Vue(this.options).$mount('#app');

        // new Vue({
        //     router,
        //     store: store.current,
        //     components: this.components,
        //     render: (h) => h(layouts.App),
        // }).$mount('#app');
    }

    private createComponent(name: string, template: VueConstructor<Vue>, code: any): VueConstructor<Vue> {
        const component =  template.extend({
            mixins: [code],
        });

        

       console.log(component);

        return component;
    }
}
