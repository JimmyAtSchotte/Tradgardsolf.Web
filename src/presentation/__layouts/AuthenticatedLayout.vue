<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="onGoCourseList">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Banor</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="onSignOut">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logga ut</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Trädgårdsgolf</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import  Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import VueGeolocation from 'vue-browser-geolocation';
import modules from '@/presentation/modules';

import Api from '@/application/api';
import AuthenticationController from '@/core/api/controllers/AuthenticationController';
import CourseController from '@/core/api/controllers/CourseController';

const api = new Api();
const authenticationController = new AuthenticationController(api);

@Component({
  name: "AuthenticatedLayout",
  computed: mapGetters(['isAuthorized']),
})
export default class AuthenticatedLayout extends Vue
{
  public drawer : boolean = false;

  private readonly authenticationController : AuthenticationController;
  private readonly courseController : CourseController;

   constructor(){
      super();
      this.authenticationController = new AuthenticationController(new Api());
      this.courseController = new CourseController(new Api());
   }

  onGoCourseList() {
    this.$router.push({ name: modules.CourseListModule.name });
  }

   async onSignOut() {
    await authenticationController.SignOut();
    this.$store.dispatch('signOut');
    this.$router.push({ name: modules.LoginModule.name });
  }
 
  @Watch('isAuthorized')
  onIsAuthorizedChanged(value: boolean, oldValue: boolean) {
    if(!value)
      this.$router.push({ name: modules.LoginModule.name });
  }

   async created() {
      const position = await VueGeolocation.getLocation();
      const courses = await this.courseController.GetCoursesWithDistance(position.lat, position.lng);         
      this.$store.dispatch('setCourses', courses);      
   }
}
</script>
