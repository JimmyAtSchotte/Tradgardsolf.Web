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

<script>
  export default {
      methods: {
          gotoLogin: function () {
              this.$router.push({ name: 'login' });
          }
      }
  }
</script>