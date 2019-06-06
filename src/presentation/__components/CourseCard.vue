<template>
    <v-card>
        <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        <v-container fill-height fluid>
            <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
                <span class="headline">{{ course.name }}</span>
            </v-flex>
            </v-layout>
        </v-container>
        </v-img>
        <v-card-title>
        <div>
            <span class="grey--text">Number 10</span><br>
            <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span>
        </div>
        </v-card-title>
        <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Course from '@/core/api/entities/Course';

export default Vue.extend({
    name: "CourseCard",
    props: {
        course: Course
    }
});
</script>
