<template>
  <div>
    <b-container align="center" style="margin-top: 240px">
      <b-row>
        <b-col>
          <h4>Score Counter</h4>
        </b-col>
      </b-row>
      <b-row style="padding: 2% 30%;">
        <!-- team A -->
        <b-col>
          <div>
            <label for="sb-vertical">Team A</label><br>
            <b-form-spinbutton id="sb-vertical" v-model="teamA" vertical></b-form-spinbutton>
          </div>
        </b-col>
        <!-- team B -->
        <b-col>
          <div>
            <label for="sb-vertical">Team B</label><br>
            <b-form-spinbutton id="sb-vertical" v-model="teamB" vertical></b-form-spinbutton>
          </div>
        </b-col>
      </b-row>
        <!-- reset button -->
      <b-row style="padding: 0 10px;">
        <b-col>
          <b-button variant="primary" @click="resetScore">Reset Score</b-button>
          <b-button variant="danger" @click="resetData">Reset Data</b-button>
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

</style>