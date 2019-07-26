// import Vue from 'vue';
// import { Component, Watch } from 'vue-property-decorator';
// import { mapGetters } from 'vuex'
import CredentialsModel from '@/core/api/models/CredentialsModel';
import modules from '@/presentation/modules';

import Api from '@/application/api';
import AuthenticationController from '@/core/api/controllers/AuthenticationController';

// @Component({
//   name: "Login",
// //   computed: mapGetters(['isAuthorized']),
// })
export default class Login /*extends Vue*/ {
    private readonly authenticationController: AuthenticationController;

    public credentialsModel : CredentialsModel;

    constructor(){
        this.authenticationController = new AuthenticationController(new Api());
        this.credentialsModel = new CredentialsModel();
    }

    onGotoCreatePlayer(event) {
        // this.$router.push({ name: modules.CreatePlayerModule.name });
    }

    async onLogin(event) {
        const authorizePlayer = await this.authenticationController.AuthenticateWithCredentials(this.credentialsModel);
        // this.$store.dispatch('authenticateWithCredentials', authorizePlayer);   
    }

    // @Watch('isAuthorized')
    // onIsAuthorizedChanged(value: boolean, oldValue: boolean) {
    //     if(value)
    //         this.$router.push({ name: modules.CourseListModule.name });
    // } 
}