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

<script lang="ts">  
import  Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex'
import CredentialsModel from '@/core/api/models/CredentialsModel';
import modules from '@/presentation/modules';

import Api from '@/application/api';
import AuthenticationController from '@/core/api/controllers/AuthenticationController';

@Component({
  name: "Login",
  computed: mapGetters(['isAuthorized']),
})
export default class Login extends Vue 
{
    private readonly authenticationController : AuthenticationController;

    public credentialsModel : CredentialsModel;

    constructor(){
        super();
        this.authenticationController = new AuthenticationController(new Api());
        this.credentialsModel = new CredentialsModel();
    }

    onGotoCreatePlayer(event) {
        this.$router.push({ name: modules.CreatePlayerModule.name });
    }

    async onLogin(event) {
        const authorizePlayer = await this.authenticationController.AuthenticateWithCredentials(this.credentialsModel);
        this.$store.dispatch('authenticateWithCredentials', authorizePlayer);   
    }

    @Watch('isAuthorized')
    onIsAuthorized(value: boolean, oldValue: boolean) {
        if(value)
            this.$router.push({ name: modules.CourseListModule.name });
    } 
}
  
</script>