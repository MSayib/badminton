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
                  <h3>A: {{ isKananA }} B: {{ isKananB }}</h3>
              </b-col>
              <b-col>
                  <h3>A: {{ lastServeA }} B: {{ lastServeB }}</h3>
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
            lastServeA: true,
            lastServeB: false,
            status: ''
        }
    },
    methods:{
        tambahTeamA(){
            this.teamA++
        },
        kurangTeamA(){
            this.teamA--
        },
        tambahTeamB(){
            this.teamB++
        },
        kurangTeamB(){
            this.teamB--
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
            if(this.lastServeB == true && this.lastServeA == false){
                this.lastServeB = false
            }else if(this.lastServeB == false && this.lastServeA == false){
                this.lastServeB = true
            }else if(this.lastServeB == true && this.lastServeA == true){
                this.lastServeA = false
            }else{
                this.lastServeA = true
            }
            if(this.teamA % 2 == 0){
                this.isKananA = true
                if(this.lastServeA == true){
                    this.status = "A1 serve di kanan"
                }else{
                    this.status = "A2 serve di kanan"
                }
            }else{
                this.isKananA = false
                if(this.lastServeA == true){
                    this.status = "A1 serve di kiri"
                }else{
                    this.status = "A2 serve di kiri"
                }
            }
        },
        teamB(){
            if(this.lastServeA == true && this.lastServeB == false){
                this.lastServeA = false
            }else if(this.lastServeA == false && this.lastServeB == false){
                this.lastServeA = true
            }else if(this.lastServeA == true && this.lastServeB == true){
                this.lastServeB = false
            }else{
                this.lastServeB = true
            }
            if(this.teamB % 2 == 0){
                this.isKananB = true
                if(this.lastServeB == true){
                    this.status = "B1 serve di kanan"
                }else{
                    this.status = "B2 serve di kanan"
                }
            }else{
                this.isKananB = false
                if(this.lastServeB == true){
                    this.status = "B1 serve di kiri"
                }else{
                    this.status = "B2 serve di kiri"
                }
            }
        }
    }
}
</script>

<style>
</style>