import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import CourseList from '@/presentation/__modules/CourseList.vue';
import StoreFactory from '@/application/store/StoreFactory';
import RootState from '@/application/store/RootState';
import Course from '@/core/api/entities/Course';
import Vuetify from 'vuetify';

describe('CourseList.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(Vuetify);
  
  const storeFactory = new StoreFactory();

  test('should not render any CourseCards when store is empty', () => {
    const state = new RootState();
    const store = storeFactory.create(state);
    const wrapper = mount(CourseList, { store, localVue } );

    expect(wrapper.findAll('.v-card').length).toBe(0);
  });

  test('should render 2 CourseCards when store has 2 courses', () => {


    const state = new RootState();
    state.hasPlayedOnCourses = [new Course(), new Course()];

    const store = storeFactory.create(state);
    const wrapper = mount(CourseList, { store, localVue } );

    expect(wrapper.findAll('.v-card').length).toBe(2);
  });
});