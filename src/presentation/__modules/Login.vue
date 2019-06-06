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
        <v-btn color="accent" @click="onGotoCreatePlayer">Skapa användare</v-btn>
        <v-btn color="primary" @click="onLogin">Logga in</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>  
   import  Vue from 'vue';
   import { mapActions, mapGetters } from 'vuex'
   import CredentialsModel from '@/core/api/models/CredentialsModel';
   import modules from '@/presentation/modules';

   import Api from '@/application/api';
   import AuthenticationController from '@/core/api/controllers/AuthenticationController';


   const api = new Api();
   const authenticationController = new AuthenticationController(api);

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
        onGotoCreatePlayer: function (event) {
            this.$router.push({ name: modules.CreatePlayerModule.name });
        },
        onLogin: async function(event) {
            const authorizePlayer = await authenticationController.AuthenticateWithCredentials(this.credentialsModel);
            this.authenticateWithCredentials(authorizePlayer);
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