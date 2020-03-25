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
            lastServeA: false,
            lastServeB: false,
            status: ''
        }
    },

    methods:{
        tambahTeamA(){
            this.teamA++
            this.isKananA = !this.isKananA
            this.lastServeA = !this.lastServeA
            this.lastServeB = !this.lastServeB
            if(this.teamA % 2 == 1 && this.lastServeA == true && this.isKananA == false){
                this.status = "A1 serve kiri"
            }else if(this.teamA % 2 == 0 && this.lastServeA == false && this.isKananA == true){
                this.status = "A1 serve kanan"
            }else if(this.teamA % 2 == 1 && this.lastServeA == false && this.isKananA == false){
                this.status = "A2 serve kiri"
            }else{
                this.status = "A2 serve kanan"
            }
            
            
        },

        kurangTeamA(){
            this.teamA--
        },

        tambahTeamB(){
            this.teamB++
            this.isKananB = !this.isKananB
            this.lastServeB = !this.lastServeB
            this.lastServeA = !this.lastServeA
            if(this.teamB % 2 == 1 && this.lastServeB == true && this.isKananB == false){
                this.status = "B1 serve kiri"
            }else if(this.teamB % 2 == 0 && this.lastServeB == false && this.isKananB == true){
                this.status = "B1 serve kanan"
            }else if(this.teamB % 2 == 1 && this.lastServeB == false && this.isKananB == false){
                this.status = "B2 serve kiri"
            }else{
                this.status = "B2 serve kanan"
            }
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
    }
}
</script>

<style>

</style>