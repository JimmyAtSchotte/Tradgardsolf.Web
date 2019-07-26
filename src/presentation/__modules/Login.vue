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
import Vue from 'vue'
export default Vue.extend({  
})
</script>



