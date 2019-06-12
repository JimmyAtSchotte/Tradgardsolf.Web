<template>
    <v-card>
        <v-img class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-container fill-height fluid>
                <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <span class="headline">{{ course.name }}</span>
                </v-flex>
                </v-layout>
                <course-menu :course="course"></course-menu>                
            </v-container>
        </v-img>
        <v-card-title>
        <div>
            <span>Distance: {{ course.distance }} meters</span>
        </div>
        </v-card-title>
        <v-card-actions>
            <v-flex class="text-xs-right">
                <v-btn flat color="orange" id="play" v-show="showPlayButton" @click="onPlay">Spela</v-btn>       
            </v-flex>
        </v-card-actions>
        <v-spacer></v-spacer>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator';
import Course from '@/core/api/entities/Course';
import CourseMenu from '@/presentation/__components/CourseMenu.vue';
import modules from '@/presentation/modules';

@Component({
  name: "CourseCard",
  components: {
     CourseMenu
  }
})
export default class CourseCard extends Vue
{
    @Prop()
    public course : Course;

    get showPlayButton() {            
        return this.course.distance < 2000;
    }

    onPlay(event) {
        this.$router.push( { 
            name: modules.RoundSetupModule.name,           
            params: { courseId: this.course.id.toString() } 
        });
    }   
};
</script>
