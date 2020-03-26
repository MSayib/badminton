<template>
  <div>
      <b-container align="center" style="margin-top: 180px;">

          <b-row>
              <b-col>
                  <h5>player A</h5>
              </b-col>
              <b-col>
                  <h5>player B</h5>
              </b-col>
          </b-row>

          <b-row>
              <b-col>
                  <h2>{{ teamA }}</h2>
              </b-col>
              <b-col>
                  <h2> : </h2>
              </b-col>
              <b-col>
                  <h2>{{ teamB }}</h2>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-button @click="tambahTeamA" variant="primary">+</b-button>
                  <b-button @click="kurangTeamA" variant="danger">-</b-button>
              </b-col>

              <b-col></b-col>

              <b-col>
                  <b-button @click="tambahTeamB" variant="primary">+</b-button>
                  <b-button @click="kurangTeamB" variant="danger">-</b-button>
              </b-col>
          </b-row>

          <b-row>
              <b-col>
                  <b-button @click="reset" variant="warning">Reset</b-button>
              </b-col>
          </b-row>

          <b-row>
              <b-col>{{ status }}</b-col>
          </b-row>
          
          <b-row>
              <b-col>
                  <h3>A: {{ isKananA }} B: {{ isKananB }}</h3>
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
            isKananA: true,
            isKananB: true,
            status: ''
        }
    },
    methods:{
        tambahTeamA(){
            this.teamA++
        },
        kurangTeamA(){
            if(this.teamA > 0){
              this.teamA--
            }
        },
        tambahTeamB(){
            this.teamB++
        },
        kurangTeamB(){
            if(this.teamB > 0){
              this.teamB--
            }
        },
        reset(){
            this.teamA = 0,
            this.teamB = 0,
            this.isKananA = true,
            this.isKananB = true,
            this.status = ""
        }
    },
    watch:{
        teamA(){
            if(this.teamA % 2 == 0){
              this.isKananA = true
              this.status = "Player A serve di kanan"
            }else{
              this.isKananA = false
              this.status = "Player A serve di kiri"
            }
        },
        teamB(){
            if(this.teamB % 2 == 0){
              this.isKananB = true
              this.status = "Player B serve di kanan"
            }else{
              this.isKananB = false
              this.status = "Player B serve di kiri"
            }
        }
    }
}
</script>

<style>
</style>