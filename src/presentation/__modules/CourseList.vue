<template>
   <div>
      <CourseCard v-for="course in courses" v-bind:key="course.id" :course="course"></CourseCard>
   </div>    
</template>

<script lang="ts">
import  Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import CourseCard from '@/presentation/__components/CourseCard.vue';

@Component({
  name: "CourseList",
  components: {
     CourseCard
  },
  computed: mapGetters(['courses']),
})
export default class CourseList extends Vue
{
  
};
</script>