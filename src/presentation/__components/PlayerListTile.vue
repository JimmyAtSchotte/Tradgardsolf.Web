<template>
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <v-icon>account_circle</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-text="player.name"></v-list-tile-title>
        <v-list-tile-sub-title>{{ player.email }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-icon >{{ icon }}</v-icon>
      </v-list-tile-action>
    </v-list-tile>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator';
import Player from '@/core/api/entities/Player';

@Component({
  name: "PlayerListTile"
})
export default class PlayerListTile extends Vue
{
    @Prop()
    public player : Player;   

    @Prop()
    public icon : string;   
};
</script>
