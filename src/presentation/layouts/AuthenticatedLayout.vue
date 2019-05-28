<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="signOut">
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
   import { mapActions, mapGetters } from 'vuex';
   import modules from '@/application/modules';


  export default Vue.extend({
    data: () => ({
      drawer: null
    }),
    computed: {
        ...mapGetters(['isAuthorized']),        
    },
    methods: {
      ...mapActions(['signOut'])     
    },    
    created() {
      if(!this.isAuthorized)
        this.$router.push({ name: modules.LoginModule.name });
    },
    watch: {
        isAuthorized: function (val) {
            if(!val)
                this.$router.push({ name: modules.LoginModule.name });
        }
    }
  });
</script>