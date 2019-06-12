<template>
     <div>
         <h1>{{ courseId }}</h1>
    </div>   
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import Course from '@/core/api/entities/Course';

@Component({
  name: "RoundSetup",
})
export default class RoundSetup extends Vue
{
    @Prop()
    public courseId: Course;
}
</script>
