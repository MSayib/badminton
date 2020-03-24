<template>
  <div>
    <b-container align="center" style="margin-top: 240px">
      <b-row>
        <b-col>
          <h4>Score Counter</h4>
        </b-col>
      </b-row>

      <b-row class="scoreBoard">
        <b-col></b-col>
        <b-col class="score">
          <span>{{ teamA }}</span>
        </b-col>
        <b-col class="score">
          <span>{{ teamB }}</span>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row>
        <b-col v-if="this.teamA == 0 && this.teamB == 0">Team A serve pertama</b-col>
        <b-col v-else-if="this.teamA % 2 == 0">Team A serve di kanan</b-col>
        <b-col v-else-if="this.teamA % 2 == 1">Team A serve di kiri</b-col>
        <b-col v-else-if="this.teamB % 2 == 0">Team B serve di kanan</b-col>
        <b-col v-else>Team B serve di kiri</b-col>
      </b-row>

      <b-row style="padding: 2% 30%;">
        <!-- team A -->
        <b-col>
          <h4>Team A</h4>
          <b-button @click="tambahTeamA" variant="primary">+</b-button>
          <b-button @click="kurangTeamA" variant="danger">-</b-button>
        </b-col>
        <!-- team B -->
        <b-col>
          <h4>Team B</h4>
          <b-button @click="tambahTeamB" variant="primary">+</b-button>
          <b-button @click="kurangTeamB" variant="danger">-</b-button>
        </b-col>
      </b-row>
        <!-- reset button -->
      <b-row style="padding: 0 10px;">
        <b-col>
          <b-button variant="primary" @click="resetScore">Reset Score</b-button>
        </b-col>
      </b-row>
      
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      teamA: 0,
      teamB: 0,
    }
  },

  methods:{
    tambahTeamA(){
      this.teamA += 1
    },

    tambahTeamB(){
      this.teamB += 1
    },

    kurangTeamA(){
      this.teamA -= 1
    },

    kurangTeamB(){
      this.teamB -= 1
    },

    resetScore(){
      this.teamA = 0,
      this.teamB = 0
    },

    resetData(){
      this.teamA = 0,
      this.teamB = 0,
      this.$router.push('/start')
    }
  }
}
</script>

<style>
  .scoreBoard{
    font-size: 60px;
  }

  .score{
    border: 2px solid;
  }
</style>