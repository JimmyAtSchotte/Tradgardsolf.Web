<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Logga in</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form>
            <v-text-field prepend-icon="person" name="login" label="E-post" v-model="credentialsModel.email"></v-text-field>
            <v-text-field id="password" prepend-icon="lock" name="password" label="Lösenord" type="password" v-model="credentialsModel.password"></v-text-field>
        </v-form>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" @click="gotoCreatePlayer">Skapa användare</v-btn>
        <v-btn color="primary" @click="login">Logga in</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>  
   import  Vue from 'vue';
   import { mapActions, mapGetters } from 'vuex'
   import CredentialsModel from '@/core/api/models/CredentialsModel';
   import modules from '@/application/modules';


  export default {      
      name: 'Login',  
    data: () => ({
        credentialsModel: new CredentialsModel()                   
    }),
    computed: {
        ...mapGetters(['isAuthorized']),        
    },
    methods: {
        ...mapActions(['authenticateWithCredentials']),
        gotoCreatePlayer: function (event) {
            this.$router.push({ name: modules.CreatePlayerModule.name });
        },
        login: async function(event) {
            await this.authenticateWithCredentials(this.credentialsModel);
        },
    },
    watch: {
        isAuthorized: function (val) {
            if(val)
                this.$router.push({ name: modules.CourseListModule.name });
        }
    }
}
  
</script>