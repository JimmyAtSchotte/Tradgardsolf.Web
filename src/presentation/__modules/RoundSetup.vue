<template>
     <div>
         <CourseCard :course="selectedCourse"></CourseCard>

         <v-list subheader>
          <v-subheader>Valda spelare</v-subheader>
          <PlayerListTile v-for="player in selectedPlayers" :key="player.id" :player="player" :icon="'remove_circle'" @click.native="onRemove(player)"></PlayerListTile>
        </v-list>
         
         <v-list subheader>
          <v-subheader>Välj spelare</v-subheader>      
          <PlayerListTile v-for="player in unselectedPlayers" :key="player.id" :player="player" :icon="'add_circle'" @click.native="onAdd(player)"></PlayerListTile> 

          <v-list-tile avatar @click="onShowNewPlayer()">
            <v-list-tile-avatar>
              <v-icon>add_circle</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Ny spelare</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-dialog v-model="showNewPlayer">
          <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                  <v-toolbar-title>Ny spelare</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <v-form>
                  <v-text-field prepend-icon="person" name="name" label="Namn" v-model="newPlayer.name" ></v-text-field>
                  <v-text-field prepend-icon="email" name="email" label="E-post" v-model="newPlayer.email" ></v-text-field>
              </v-form>
              </v-card-text>
              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" @click="onAddNewPlayer">Lägg till</v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>   

        <v-footer  height="auto" color="primary lighten-1">
          <v-layout justify-center row wrap fixed="true">
              <v-btn color="white" flat round @click="onStartPlay()">
                Börja spela
              </v-btn>                
            </v-layout>
        </v-footer>     
    </div>   
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { List } from 'linqts';
import CourseCard from '@/presentation/__components/CourseCard.vue';
import PlayerListTile from '@/presentation/__components/PlayerListTile.vue';
import Player from '@/core/api/entities/Player';
import Course from '@/core/api/entities/Course';
import Round from '@/core/api/models/Round';
import modules from '@/presentation/modules';
import PlayerController from '@/core/api/controllers/PlayerController';
import Api from '@/application/api';

@Component({
  name: "RoundSetup",
  components: {
     CourseCard,
     PlayerListTile
  },
})
export default class RoundSetup extends Vue
{
    private readonly playerController : PlayerController;

    private readonly selectedPlayerList : List<Player>;
    private readonly unselectedPlayerList : List<Player>;
    public selectedCourse : Course;

    public showNewPlayer : boolean;
    public newPlayer : Player;

    constructor() {
        super();

        this.playerController = new PlayerController(new Api());
        this.selectedPlayerList = new List<Player>();
        this.unselectedPlayerList = new List<Player>();
        this.selectedCourse = null;
        this.showNewPlayer = false;
        this.newPlayer = new Player();
    }

    get selectedPlayers() : Player[] {
        return this.selectedPlayerList.ToArray();
    }

    get unselectedPlayers() : Player[] {
        return this.unselectedPlayerList.ToArray();
    }

    onAdd(player: Player) {        
        this.selectedPlayerList.Add(player);  
        this.unselectedPlayerList.Remove(player);  
    }

    onRemove(player: Player) {        
        this.unselectedPlayerList.Add(player);
        this.selectedPlayerList.Remove(player);  
    }

    onShowNewPlayer(){
      this.showNewPlayer = true;
      this.newPlayer = new Player();
    }

    onAddNewPlayer(){
      this.selectedPlayerList.Add(this.newPlayer);  
      this.newPlayer = new Player();
      this.showNewPlayer = false;
    }

    onStartPlay(){
      const round = new Round(this.selectedCourse , this.selectedPlayerList.ToArray());
      this.$store.dispatch('setCurrentRound', round);
      this.$store.dispatch('setSelectedPlayers', this.selectedPlayerList.ToArray());
      this.$router.push({ name: modules.PlayModule.name });
    }

    async created(){
        this.selectedCourse = this.$store.getters.selectedCourse;

        if(this.selectedCourse == null){
          this.$router.push({ name: modules.CourseListModule.name });
          return;
        }

        this.unselectedPlayerList.AddRange(await this.playerController.GetPlayersThatHasPlayedOnCourse(this.selectedCourse));
        this.selectedPlayerList.AddRange(this.$store.getters.selectedPlayers);

        if(!this.selectedPlayerList.Any())
          this.selectedPlayerList.Add(this.$store.getters.authorizedPlayer);
        
        this.unselectedPlayerList.ForEach(player => {
          if (this.selectedPlayerList.Any(s => s.id == player.id))
           this.unselectedPlayerList.Remove(player);
        });       
    }
}
</script>
