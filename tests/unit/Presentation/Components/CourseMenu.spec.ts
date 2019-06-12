import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import CourseMenu from '@/presentation/__components/CourseMenu.vue';
import Course from '@/core/api/entities/Course';
import StoreFactory from '@/application/store/StoreFactory';
import RootState from '@/application/store/RootState';
import Vuetify from 'vuetify';

describe('CourseCard.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(Vuetify);

  const storeFactory = new StoreFactory();

  test('Should set course props', () => {
    const course = new Course();

    const wrapper = mount(CourseMenu,
      {
        localVue,
        propsData: {
          course: course
        }
      });

    expect(wrapper.props().course).toBe(course);
    expect(wrapper.props('course')).toBe(course);
  });

  test('Should display statistics if has played on course', () => {
    const course = new Course();
    course.hasPlayedOnCourse = true;

    const wrapper = mount(CourseMenu,
      {
        localVue,
        propsData: {
          course: course
        }
      });

    expect(wrapper.find('#statistics').isVisible()).toBe(true);
  });

  test('Should not display statistics if has not played on course', () => {
    const course = new Course();
    course.hasPlayedOnCourse = false;

    const wrapper = mount(CourseMenu,
      {
        localVue,
        propsData: {
          course: course
        }
      });

      expect(wrapper.find('#statistics').isVisible()).toBe(false);
  });

  test('Should display season table if has played on course', () => {
    const course = new Course();
    course.hasPlayedOnCourse = true;

    const wrapper = mount(CourseMenu,
      {
        localVue,
        propsData: {
          course: course
        }
      });

    expect(wrapper.find('#seasontable').isVisible()).toBe(true);
  });

  test('Should not display season table  if has not played on course', () => {
    const course = new Course();
    course.hasPlayedOnCourse = false;

    const wrapper = mount(CourseMenu,
      {
        localVue,
        propsData: {
          course: course
        }
      });

      expect(wrapper.find('#seasontable').isVisible()).toBe(false);
  });
});
