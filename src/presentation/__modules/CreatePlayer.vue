<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Skapa spelare</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form>
            <v-text-field prepend-icon="person" name="login" label="E-post" type="text"></v-text-field>
        </v-form>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" @click="gotoLogin">Tillbaka till login</v-btn>
        <v-btn color="primary">Skapa användare</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import  Vue from 'vue';
import { Component } from 'vue-property-decorator';
import modules from '@/presentation/modules';

@Component({
  name: "CreatePlayer",
})
export default class CreatePlayer extends Vue
{
    gotoLogin() {
        this.$router.push({ name: modules.LoginModule.name });
    }      
}
</script>