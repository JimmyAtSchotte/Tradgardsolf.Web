<template>
<div>
  
  <ul class="scoretable" v-bind:class="scoreTablePlayerClass">
    <li>
        <ul>
          <li>Hål</li>
          <li v-for="(player, idx) in currentRound.players" :key="idx">{{ player.player.name}}</li>
        </ul>

        <ul v-for="(hole, holeIndex) in currentRound.course.holes" :key="holeIndex"> 
          <li class="scoretable-hole">{{ hole }}</li>
          <li v-for="(player, playerIndex) in currentRound.players" :key="playerIndex">
            <v-btn @click="onShowScoreDialog(player, hole, playerIndex, holeIndex)">{{ player.scores[holeIndex] }}</v-btn>            
          </li>          
        </ul>

        <ul>
          <li>=</li>
          <li v-for="(player, idx) in currentRound.players" :key="idx">{{ summerize(player) }}</li>
        </ul>
    </li>
  </ul>

  <v-footer height="auto" color="primary lighten-1" v-show="showSaveRound()" :fixed="true">
      <v-layout justify-center row wrap>
        <v-btn color="white" flat round block @click="onSaveRound()">
          Spara runda
        </v-btn>  
      </v-layout>
    </v-footer>     

  <v-dialog v-model="showScoreDialog">
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Sätt poäng för {{ currentPlayerName }} på hål {{ currentHole }} </v-toolbar-title>
        </v-toolbar>
        <v-card-text>

        <v-container fluid>  
          <v-layout row  wrap justify-start>
            <v-flex xs4 v-for="n in 9" :key="n">
              <v-btn @click="onSetScore(n)">{{ n }}</v-btn>
            </v-flex> 
          </v-layout> 
        </v-container>
        </v-card-text>
    </v-card>
  </v-dialog> 
</div>
</template>

<style lang="css">
ul.scoretable { 
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-bottom: 20px;
}
ul.scoretable  li     ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;    
}
ul.scoretable  li     ul        li {
          float:left;
          text-align: center;   
          width: 10%;
          padding-right: 3%;
          padding-left: 3%;
          text-overflow: ellipsis;
          overflow: hidden;
}
 ul.scoretable  li     ul        li         button {
            width: 100%;
            min-width: auto;
          }
              
ul.scoretable  li     ul        li.scoretable-hole {
          padding-top:  14px;
        }      
 
ul.scoretable.players-1 li ul li { width: 90% }
ul.scoretable.players-1 li ul li:first-child { width: 10% }
ul.scoretable.players-2 li ul li { width: 45% }
ul.scoretable.players-2 li ul li:first-child { width: 10% }
ul.scoretable.players-3 li ul li { width: 30% }
ul.scoretable.players-3 li ul li:first-child { width: 10% }
ul.scoretable.players-4 li ul li { width: 22% }
ul.scoretable.players-4 li ul li:first-child { width: 10% }
ul.scoretable.players-5 li ul li { width: 18% }
ul.scoretable.players-5 li ul li:first-child { width: 10% }
ul.scoretable.players-6 li ul li { width: 15% }
ul.scoretable.players-6 li ul li:first-child { width: 10% }
ul.scoretable.players-7 li ul li { width: 12% }
ul.scoretable.players-7 li ul li:first-child { width: 10% }
ul.scoretable.players-8 li ul li { width: 11% }
ul.scoretable.players-8 li ul li:first-child { width: 10% }
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Course from '@/core/api/entities/Course';
import Player from '@/core/api/entities/Player';
import Round from '@/core/api/models/Round';
import RoundScore from '@/core/api/models/RoundScore';
import modules from '@/presentation/modules';
import UpdatePlayerScore from '../../application/store/UpdatePlayerScore';


@Component({
  name: "Play",  
  computed: mapGetters(['currentRound']),
})
export default class Play extends Vue
{
    public selectedCourse : Course;
    public showScoreDialog : boolean;

    
    private currentRoundScore : RoundScore;
    private currentHole : number = 0;
    private currentHoleIndex : number = 0;
    private currentPlayerIndex : number = 0;
    private currentPlayerName : string = '';
    private scoreTablePlayerClass: string = '';

    constructor(){
      super();

      this.showScoreDialog = false;
    }
    summerize(player: RoundScore) : number
    {
        return player.scores.reduce((a, b) => a + b, 0);
    }
    showSaveRound() : Boolean
    {
       const players: RoundScore[] = this.$store.getters.currentRound.players;
       for(let player of players) {
          for(let score of player.scores){

            console.log(score);
            if ( score === undefined)
              return false;
          }
       }

      return true;
    }

    

    onShowScoreDialog(player: RoundScore, hole: number, playerIndex: number, holeIndex: number){
      this.currentRoundScore = player;
      this.currentHole = hole;
      this.currentHoleIndex = holeIndex;
      this.currentPlayerIndex = playerIndex;
      this.currentPlayerName = player.player.name;
      this.showScoreDialog = true;
    }

    onSetScore(score: number)
    {
      const updatePlayerScore = new UpdatePlayerScore();
      updatePlayerScore.playerIndex = this.currentPlayerIndex;
      updatePlayerScore.holeIndex = this.currentHoleIndex;
      updatePlayerScore.score = score;

      this.$store.dispatch('updatePlayerScore', updatePlayerScore);
      this.showScoreDialog = false;
    }

    async created(){
        const currentRound = this.$store.getters.currentRound;
        console.log(currentRound);

        if(currentRound == null){
          this.$router.push({ name: modules.CourseListModule.name });
          return;
        }

        this.scoreTablePlayerClass = `players-${currentRound.players.length}`;
    }
}
</script>
