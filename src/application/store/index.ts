
import RootState from '@/application/store/RootState';
import StoreFactory from '@/application/store/StoreFactory';

const storeFactory = new StoreFactory();
const store = storeFactory.create(new RootState());

export default {
  current: store
};

// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== 'production',
//   plugins: [createPersistedState({
//     paths: [
//       'authorizedPlayer',
//     ],
//   })],
//   state: new RootState(),
//   mutations: {
//     setAuthorizedPlayer(state, authorizedPlayer: AuthorizedPlayer) {
//       state.authorizedPlayer = authorizedPlayer;
//     },
//     setHasPlayedOnCourses(state, courses: Course[]) {
//       state.hasPlayedOnCourses = courses;
//     },
//     setHasNotPlayedOnCourses(state, courses: Course[]) {
//       state.hasNotPlayedOnCourses = courses;
//     },
//     resetState(state) {
//       Object.assign(state, new RootState());
//       state.authorizedPlayer = null;
//     },
//   },
//   actions: {
//     async authenticateWithCredentials(context: ActionContext<RootState, RootState>, credentialsModel: CredentialsModel) {
//       await authenticationController.AuthenticateWithCredentials(credentialsModel).then((model) => {
//         context.commit('setAuthorizedPlayer', model);
//       });
//     },
//     signOut(context: ActionContext<RootState, RootState>) {
//       context.commit('resetState');
//       authenticationController.SignOut();
//     },
//     setAuthorizedPlayer(context: ActionContext<RootState, RootState>, authorizedPlayer: AuthorizedPlayer | undefined) {
//       context.commit('setAuthorizedPlayer', authorizedPlayer);
//     },
//     async setHasPlayedOnCourses(context: ActionContext<RootState, RootState>) {
//       await courseController.GetHasPlayedOnCourses().then((model) => {
//         context.commit('setHasPlayedOnCourses', model);
//       });
//     },
//     async setHasNotPlayedOnCourses(context: ActionContext<RootState, RootState>) {
//       await courseController.GetHasNotPlayedOnCourses().then((model) => {
//         context.commit('setHasNotPlayedOnCourses', model);
//       });
//     },
//     rejectedApiCall(context: any, error: any) {
//       if (error.reson.response.status === 401) {
//         context.commit('resetState');
//       }
//     },
//   },
//   getters: {
//     isAuthorized(state): boolean {
//       return state.authorizedPlayer !== null;
//     },
//     authorizedPlayer(state): AuthorizedPlayer {
//       return state.authorizedPlayer;
//     },
//     hasPlayedOnCourses(state): Course[] {
//       return state.hasPlayedOnCourses;
//     },
//     hasNotPlayedOnCourses(state): Course[] {
//       return state.hasNotPlayedOnCourses;
//     },
//   },
// });
