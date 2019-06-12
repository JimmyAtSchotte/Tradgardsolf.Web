<template>
    <v-menu>
        <template #activator="{ on: menu }">
        <v-tooltip bottom>
            <template #activator="{ on: tooltip }">                                
                <v-btn color="primary"  dark v-on="{ ...tooltip, ...menu }">Mer</v-btn>
            </template>
            <span>Mer</span>
        </v-tooltip>
        </template>
        <v-list>
            <v-list-tile id="statistics" v-show="showStatistics" >
                <v-list-tile-title>Statistik</v-list-tile-title>
            </v-list-tile>
            <v-list-tile id="seasontable" v-show="showSeasonTable">
                <v-list-tile-title>Säsongstabell</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>



<script lang="ts">
import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator';
import Course from '@/core/api/entities/Course';

@Component({
  name: "CourseMenu",  
})
export default class CourseMenu extends Vue
{
    @Prop()
    public course : Course;

    get showStatistics() {
        return this.course.hasPlayedOnCourse;
    }

    get showSeasonTable() {
        return this.course.hasPlayedOnCourse;
    } 
}
</script>