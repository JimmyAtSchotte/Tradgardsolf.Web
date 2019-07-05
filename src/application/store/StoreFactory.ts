
import Vue from 'vue';
import Vuex, { ActionContext, Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Course from '@/core/api/entities/Course';
import RootState from '@/application/store/RootState';
import Player from '@/core/api/entities/Player';
import Round from '@/core/api/models/Round';
import UpdatePlayerScore from './UpdatePlayerScore';

Vue.use(Vuex);

export default class StoreFactory {
    public create(defaultState: RootState): Store<RootState>
    {
        return new Vuex.Store({
            strict: process.env.NODE_ENV !== 'production',
            plugins: [createPersistedState({
              paths: [
                'authorizedPlayer',
                'selectedCourse',
                'selectedPlayers',
                'currentRound',
              ],
            })],
            state: defaultState,
            mutations: {
              setAuthorizedPlayer(state, authorizedPlayer: Player) {
                state.authorizedPlayer = authorizedPlayer;
              },
              setCourses(state, courses: Course[]) {
                state.courses = courses;
              },
              setSelectedCourse(state, course: Course) {
                state.selectedCourse = course;
              },
              setSelectedPlayers(state, players: Player[]) {
                state.selectedPlayers = players;
              },
              setCurrentRound(state, round: Round) {
                state.currentRound = round;
              },
              updatePlayerScore(state, updatePlayerScore: UpdatePlayerScore) {
                console.log(updatePlayerScore);
                state.currentRound
                     .players[updatePlayerScore.playerIndex]
                     .scores[updatePlayerScore.holeIndex] = updatePlayerScore.score;
              },
              resetState(state) {
                Object.assign(state, defaultState);
                state.authorizedPlayer = null;
                state.selectedCourse = null;
                state.currentRound = null;
                state.selectedPlayers = [] as Player[];
              },
            },
            actions: {
              authenticateWithCredentials(context: ActionContext<RootState, RootState>, authorizedPlayer: Player) {
                  context.commit('setAuthorizedPlayer', authorizedPlayer);
              },
              signOut(context: ActionContext<RootState, RootState>) {
                context.commit('resetState');
              },
              setAuthorizedPlayer(context: ActionContext<RootState, RootState>, authorizedPlayer: Player | undefined) {
                context.commit('setAuthorizedPlayer', authorizedPlayer);
              },
              setCourses(context: ActionContext<RootState, RootState>, courses: Course[]) {
                  context.commit('setCourses', courses);
              },
              setSelectedCourse(context: ActionContext<RootState, RootState>, course: Course) {
                context.commit('setSelectedCourse', course);
              },
              setSelectedPlayers(context: ActionContext<RootState, RootState>, players: Player[]) {
                context.commit('setSelectedPlayers', players);
              },
              setCurrentRound(context: ActionContext<RootState, RootState>, round: Round) {
                context.commit('setCurrentRound', round);
              },
              updatePlayerScore(context: ActionContext<RootState, RootState>, updatePlayerScore: UpdatePlayerScore) {
                context.commit('updatePlayerScore', updatePlayerScore);
              },
            },
            getters: {
              isAuthorized(state): boolean {
                return state.authorizedPlayer !== null;
              },
              authorizedPlayer(state): Player {
                return state.authorizedPlayer;
              },
              courses(state): Course[] {
                return state.courses;
              },
              selectedCourse(state): Course {
                return state.selectedCourse;
              },
              selectedPlayers(state): Player[] {
                return state.selectedPlayers;
              },
              currentRound(state): Round {
                return state.currentRound;
              },
            },
          });
    }
}