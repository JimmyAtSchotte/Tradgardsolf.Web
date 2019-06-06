<template>
<div>
    <CourseCard v-for="course in hasPlayedOnCourses" v-bind:key="course.id" :course="course"></CourseCard>

</div>
    
</template>

<script lang="ts">
import  Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import CourseCard from '@/presentation/__components/CourseCard.vue';

import Api from '@/application/api';
import CourseController from '@/core/api/controllers/CourseController';

const api = new Api();
const courseController = new CourseController(api);

export default Vue.extend({
   name: 'CourseList',
   components: {
      CourseCard
   },
   computed: {
       ...mapGetters(['hasPlayedOnCourses', 'hasNotPlayedOnCourses'])
   },
   methods: {
      ...mapActions(['setHasPlayedOnCourses', 'setHasNotPlayedOnCourses'])
   },
   async created() {
      this.setHasPlayedOnCourses(await courseController.GetHasPlayedOnCourses());
      this.setHasNotPlayedOnCourses(await courseController.GetHasPlayedOnCourses());
   }
});
</script>