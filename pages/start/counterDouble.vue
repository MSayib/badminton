<template>
  <div>
      <b-container align="center" style="margin-top: 180px;">

          <b-row>
              <b-col>
                  <h5>player A1 / player A2</h5>
              </b-col>
              <b-col>
                  <h5>player B1 / player B2</h5>
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
                  <h3>{{ isKanan }}</h3>
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
            isKanan: true,
            status: ''
        }
    },

    methods:{
        tambahTeamA(){
            this.teamA++
            this.isKanan = !this.isKanan
            if(this.teamA % 2 == 1 && this.isKanan == false){
                this.status = "player A1 serve di kiri"
            }else if(this.teamA % 2  == 0 && this.isKanan == true){
                this.status = "player A1 serve di kanan"
            }else if(this.teamA % 2 == 1 && this.isKanan == true){
                this.status = "player A2 serve di kiri"
            }else{
                this.status = "player A2 serve di kanan"
            }
        },

        kurangTeamA(){
            this.teamA--
        },

        tambahTeamB(){
            this.teamB++
            this.isKanan = !this.isKanan
            if(this.teamB % 2 == 1 && this.isKanan == false){
                this.status = "player B1 serve di kiri"
            }else if(this.teamB % 2 == 0 && this.isKanan == true){
                this.status = "player B1 serve di kanan"
            }else if(this.teamB % 2 == 1 && this.isKanan == true){
                this.status = "player B2 serve di kiri"
            }else{
                this.status = "player B2 serve di kanan"
            }
        },

        kurangTeamB(){
            this.teamB--
        },

        reset(){
            this.teamA = 0,
            this.teamB = 0,
            this.isKanan = true
        }
    }
}
</script>

<style>

</style>