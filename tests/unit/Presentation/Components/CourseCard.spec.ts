import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import CourseCard from '@/presentation/__components/CourseCard.vue';
import Course from '@/core/api/entities/Course';
import Vuetify from 'vuetify';

describe('CourseCard.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  test('Should set course props', () => {
    const course = new Course();
    const wrapper = mount(CourseCard, { localVue,
       propsData: {
          course: course
        }});

        expect(wrapper.props().course).toBe(course);
        expect(wrapper.props('course')).toBe(course);
  });

  test('Should display play if distance is under 200 meters', () => {
    const course = new Course();
    course.distance = 199;
    const wrapper = mount(CourseCard, { localVue,
       propsData: {
          course: course
        }});

        expect(wrapper.find('#play').isVisible()).toBe(true);
  });

  test('Should not display play if distance is 200 meters or over', () => {
    const course = new Course();
    course.distance = 200;
    const wrapper = mount(CourseCard, { localVue,
       propsData: {
          course: course
        }});

        expect(wrapper.find('#play').isVisible()).toBe(false);
  });
});