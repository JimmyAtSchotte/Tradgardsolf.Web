import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import AuthorizedPlayer from '@/core/api/entities/AuthorizedPlayer';
import Course from '@/core/api/entities/Course';
import CourseController from '@/core/api/controllers/CourseController';
import AuthenticationController from '@/core/api/controllers/AuthenticationController';
import CredentialsModel from '@/core/api/models/CredentialsModel';
import Api from './Api';
import RootState from '@/store/RootState';

Vue.use(Vuex);

const api = new Api();
const courseController = new CourseController(api);
const authenticationController = new AuthenticationController(api);

export default new Vuex.Store({
   strict: process.env.NODE_ENV !== 'production',
   plugins: [createPersistedState({
     paths: [
         'authorizedPlayer',
     ],
  })],
  state: new RootState(),
  mutations: {
    setAuthorizedPlayer(state, authorizedPlayer: AuthorizedPlayer | undefined) {
      Vue.set(state, 'authorizedPlayer', authorizedPlayer);
    },
    setHasPlayedOnCourses(state, courses: Course[]) {
      Vue.set(state, 'hasPlayedOnCourses', courses);
    },
    setHasNotPlayedOnCourses(state, courses: Course[]) {
      Vue.set(state, 'hasNotPlayedOnCourses', courses);
    },
    resetState(state) {
      Object.assign(state, new RootState());
    },
  },
  actions: {
    async authenticateWithCredentials(context: ActionContext<RootState, RootState>, 
                                      credentialsModel: CredentialsModel) {
        await authenticationController.AuthenticateWithCredentials(credentialsModel).then((model) => {
          context.commit('setAuthorizedPlayer', model);
        });
    },
    signOut(context: ActionContext<RootState, RootState>, credentialsModel: CredentialsModel) {
        context.commit('resetState');
        context.commit('setAuthorizedPlayer', undefined);
        authenticationController.SignOut();
    },
    setAuthorizedPlayer(context: ActionContext<RootState, RootState>, authorizedPlayer: AuthorizedPlayer | undefined) {
      context.commit('setAuthorizedPlayer', authorizedPlayer);
    },
    async setHasPlayedOnCourses(context: ActionContext<RootState, RootState>) {
      await courseController.GetHasPlayedOnCourses().then((model) => {
        context.commit('setHasPlayedOnCourses', model);
      });
    },
    async setHasNotPlayedOnCourses(context: ActionContext<RootState, RootState>) {
      await courseController.GetHasNotPlayedOnCourses().then((model) => {
        context.commit('setHasNotPlayedOnCourses', model);
      }, (reson: any) => context.dispatch('rejectedApiCall', { context, reson }));
    },
    rejectedApiCall(context: any, error: any) {
      if(error.reson.response.status === 401) {
          context.commit('resetState');
          context.commit('setAuthorizedPlayer', undefined);
      }
    },
  },
  getters: {
    isAuthorized: (state) => state.authorizedPlayer !== undefined,
    authorizedPlayer: (state) => state.authorizedPlayer,
    hasPlayedOnCourses: (state) => state.hasPlayedOnCourses,
    hasNotPlayedOnCourses: (state) => state.hasNotPlayedOnCourses,
  },
});
