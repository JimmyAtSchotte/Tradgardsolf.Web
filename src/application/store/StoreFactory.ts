
import Vue from 'vue';
import Vuex, { ActionContext, Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import AuthorizedPlayer from '@/core/api/entities/AuthorizedPlayer';
import Course from '@/core/api/entities/Course';
import RootState from '@/application/store/RootState';

Vue.use(Vuex);

export default class StoreFactory {
    public create(defaultState: RootState): Store<RootState>
    {
        return new Vuex.Store({
            strict: process.env.NODE_ENV !== 'production',
            plugins: [createPersistedState({
              paths: [
                'authorizedPlayer',
              ],
            })],
            state: defaultState,
            mutations: {
              setAuthorizedPlayer(state, authorizedPlayer: AuthorizedPlayer) {
                state.authorizedPlayer = authorizedPlayer;
              },
              setCourses(state, courses: Course[]) {
                state.courses = courses;
              },
              resetState(state) {
                Object.assign(state, defaultState);
                state.authorizedPlayer = null;
              },
            },
            actions: {
              authenticateWithCredentials(context: ActionContext<RootState, RootState>, authorizedPlayer: AuthorizedPlayer) {
                  context.commit('setAuthorizedPlayer', authorizedPlayer);
              },
              signOut(context: ActionContext<RootState, RootState>) {
                context.commit('resetState');
              },
              setAuthorizedPlayer(context: ActionContext<RootState, RootState>, authorizedPlayer: AuthorizedPlayer | undefined) {
                context.commit('setAuthorizedPlayer', authorizedPlayer);
              },
              setCourses(context: ActionContext<RootState, RootState>, courses: Course[]) {
                  context.commit('setCourses', courses);
              },
            },
            getters: {
              isAuthorized(state): boolean {
                return state.authorizedPlayer !== null;
              },
              authorizedPlayer(state): AuthorizedPlayer {
                return state.authorizedPlayer;
              },
              courses(state): Course[] {
                return state.courses;
              },
            },
          });
    }
}