<template>
   <div>
      <CourseCard v-for="course in courses" v-bind:key="course.id" :course="course"></CourseCard>
   </div>    
</template>

<script lang="ts">
import  Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import VueGeolocation from 'vue-browser-geolocation';
import CourseCard from '@/presentation/__components/CourseCard.vue';

import IApi from '@/core/interfaces/IApi';
import Api from '@/application/api';
import CourseController from '@/core/api/controllers/CourseController';

@Component({
  name: "CourseList",
  components: {
     CourseCard
  },
  computed: mapGetters(['courses']),
})
export default class CourseList extends Vue
{
   private readonly courseController : CourseController;

   constructor(){
      super();
      this.courseController = new CourseController(new Api());
   }

   async created() {
      const position = await VueGeolocation.getLocation();
      const courses = await this.courseController.GetCoursesWithDistance(position.lat, position.lng);         
      this.$store.dispatch('setCourses', courses);      
   }
};
</script>