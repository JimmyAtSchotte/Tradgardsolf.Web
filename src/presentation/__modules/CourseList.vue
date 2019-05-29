<template>
<div>
    <CourseCard v-for="course in hasPlayedOnCourses" v-bind:key="course.id" :course="course"></CourseCard>
</div>
    
</template>

<script lang="ts">

    import  Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex'

    import CourseCard from "@/presentation/__components/CourseCard.vue";

  export default Vue.extend({
     name: 'CourseList',
     components: {
        CourseCard
     },
     computed: {
         ...mapGetters(['hasPlayedOnCourses','hasNotPlayedOnCourses']),                 
     },
     methods: {
        ...mapActions(['setHasPlayedOnCourses', 'setHasNotPlayedOnCourses']),        
     },     
     created() { 
        this.setHasPlayedOnCourses();       
        this.setHasNotPlayedOnCourses();     
    },    
  });
</script>